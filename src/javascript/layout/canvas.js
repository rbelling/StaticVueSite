/*----------  Javascript responsible for the canvas  ----------*/

// Pollyfill for RequestAnimationFrame
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

let canvas = (function() {
    let canvas = document.querySelector("#animation"); 
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let width = 25;
    let height = 25;
    let flock = [];
    let flockRadius = 250;
    let flockSize = 25;

    let Boid = function(x,y,heading,size) {
        this.x = x;
        this.y = y;
        this.heading = heading
        this.size = size;
    };  
    let init = function(ref) {
        setup();
    };
    let setup = () => {
        for(let i = 0; i<flockSize; i++) {
            flock.push(new Boid(
                rand(canvas.width), rand(canvas.height), rand(360), 15)
            );
        }
        setInterval(logic, 1000/60);
    };
    let logic = function () { 
        for(let i = 0; i<flockSize; i++) {
            var centerx = 0;
            var centery = 0;
            var count = 0;            
            let b = flock[i];
            //find the neighbors of each boid - a neighbor is any boid found within flockRadius
            for (var j = 0; j < flock.length; j++)
            {
                var distance = distanceBetween(b, flock[j]);
                if (distance < flockRadius)
                {
                    //center is the position where each boid is headed
                    centerx += flock[j].x;
                    centery += flock[j].y;
                    count++;
                }
            }
            if (count > 1) {
                centerx = centerx / count;
                centery = centery / count;
            }
            else  {
                centerx = Math.random() * canvas.width;
                centery = Math.random() * canvas.height;
            }
            var angleToCenter = angleBetween(b.x,b.y,centerx,centery);
            var lerpangle = angleDifference(b.heading, angleToCenter);   
            b.heading += lerpangle * 0.02;
            let headingx = dir_x(2,b.heading);
            let headingy = dir_y(2,b.heading);   

            b.x += headingx;
            b.y += headingy;

            if (b.x < 0) b.x = canvas.width;
            if (b.y < 0) b.y = canvas.height;

            if (b.x > canvas.width) b.x = 0;
            if (b.y > canvas.height) b.y = 0;                              

        }
        requestAnimationFrame(draw);
    }
    let draw = function () { 
        ctx.clearRect( 0, 0, canvas.width, canvas.height); 
        // This sets the fill colour to red 
        ctx.fillStyle = "blue"; 
        for (let i = 0; i<flockSize; i++) {
            // draw each boid
            let b = flock[i];
            ctx.fillRect(b.x,b.y, b.size, b.size);
            ctx.beginPath();
            ctx.moveTo(b.x + (b.size / 2),b.y + (b.size / 2));
            //draw a line 20px in the direction each boid is heading to
            ctx.lineTo((b.x + (b.size / 2)) + dir_x(20,flock[i].heading),(b.y + (b.size / 2)) + dir_y(20,flock[i].heading));
            ctx.strokeStyle = "red"
            ctx.stroke();            
        }        
    }
    let rand = (max) => {
        return Math.random() * max;
    }     
    let lerp = function (start, end, speed) {
        return start + (end-start) * speed;
    }
    function distanceBetween(a, b)  {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function angleBetween(x1, y1, x2, y2)
    {
        return Math.atan2(y1 - y2, x1 - x2) * (180.0 / Math.PI);
    }

    function angleDifference(a1, a2)
    {
        return ((((a1 - a2) % 360) + 540) % 360) - 180;
    }

    function degreesToRadians(degrees){
        return degrees * (Math.PI / 180);
    }

    function dir_x(length, angle){
        return length * Math.cos(degreesToRadians(angle));
    }

    function dir_y(length, angle){
        return length * Math.sin(degreesToRadians(angle));
    }
    let publicInterface = {
        init
    }
    return publicInterface;
})();

module.exports = canvas;