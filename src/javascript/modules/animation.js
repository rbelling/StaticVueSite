/* ============================
 =            GSAP            =
 ============================ */
import '../vendor/gsap/TweenMax';
import * as d3 from "d3";

export default (() => {
    const _tl = new TimelineLite({
        paused: true,
    });
    const _intro = () => {
        var dataset = [
            { label: 'Abulia', count: 10 },
            { label: 'Betelgeuse', count: 20 },
            { label: 'Cantaloupe', count: 30 },
            { label: 'Dijkstra', count: 40 }
        ];
        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;                            // NEW
        var color = d3.scaleOrdinal(d3.schemeCategory20b);
        var svg = d3.select('.piechart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2) +
                ',' + (height / 2) + ')');
        var arc = d3.arc()
            .innerRadius(radius - donutWidth)             // UPDATED
            .outerRadius(radius);
        var pie = d3.pie()
            .value(function(d) { return d.count; })
            .sort(null);
        var path = svg.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) {
                return color(d.data.label);
            });
    };
    const init = () => {
        _intro();
    };
    return {
        init,
    };
})();
