/*----------  Javascript responsible for the canvas  ----------*/
let canvas = (function() {
    let ele = document.querySelector("#animation"); 
    let ctx = ele.getContext('2d');
    ele.width = window.innerWidth;
    ele.height = window.innerHeight;
    let width = 50;
    let height = 50;
    let heading_x = Math.random() * 360;        
    let heading_y = Math.random() * 360;
    let x = 10;
    let y = 10;        
    let duration = 0;
    let [distance_x, distance_y] = [0, 0];    
    let init = function(ref) {
        // requestAnimationFrame(draw);
        setInterval(logic, 1000/60);
        // ele.addEventListener('mousemove', function(event){
        //     x = event.clientX;
        //     y = event.clientY;
        //     logic();
        // });
        // setInterval(logic, 1000/ 60);
    };
    let lerp = function (start, end, speed) {
        return start + (end-start) * speed;
    }
    let degreesToRadians = function ( degrees) {
        return degrees * (Math.PI / 180); 
    } 
    let dir_x = function (length, angle) { 
        return length * Math.cos(degreesToRadians(angle)); 
    } 
    let dir_y = function (length, angle) { 
        return length * Math.sin(degreesToRadians(angle)); 
    }
    let logic = function () { 
        if (heading_x > 360 || heading_x < -360) 
            heading_x = 0; 
        if (heading_y > 360 || heading_y < -360) 
            heading_y = 0;
        if (x <= 0 || x >= ele.width - width) { 
            heading_x = heading_x + 180; 
        } 
        if (y <= 0 || y >= ele.height - height) {
            heading_y = -heading_y; 
        } 
        distance_x = dir_x(2.5, heading_x); 
        distance_y = dir_y(2.5, heading_y); 
        if (duration < 10) {
            duration += 0.05;
        } 
        x = lerp(x, x + distance_x, duration); 
        y = lerp(y, y + distance_y, duration); 
        requestAnimationFrame(draw);
    }
    let draw = function () { 
        ctx.clearRect( 0, 0, ele.width, ele.height); 
        // This sets the fill colour to red 
        ctx.fillStyle = "#ff0000"; 
        ctx.fillRect(x, y, 50, 50); 
    }    
    let publicInterface = {
        init, degreesToRadians
    }
    return publicInterface;
})();

module.exports = canvas;