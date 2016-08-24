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
        var width = 225;
        var height = 225;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 45;                            // NEW
        var legendRectSize = 18;                                  // NEW
        var legendSpacing = 4;                                    // NEW
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

        var legend = svg.selectAll('.legend')                     // NEW
            .data(color.domain())                                   // NEW
            .enter()                                                // NEW
            .append('g')                                            // NEW
            .attr('class', 'legend')                                // NEW
            .attr('transform', function(d, i) {                     // NEW
                var height = legendRectSize + legendSpacing;          // NEW
                var offset =  height * color.domain().length / 2;     // NEW
                var horz = -2 * legendRectSize;                       // NEW
                var vert = i * height - offset;                       // NEW
                return 'translate(' + horz + ',' + vert + ')';        // NEW
            });                                                     // NEW
        legend.append('rect')                                     // NEW
            .attr('width', legendRectSize)                          // NEW
            .attr('height', legendRectSize)                         // NEW
            .style('fill', color)                                   // NEW
            .style('stroke', color);                                // NEW
        legend.append('text')                                     // NEW
            .attr('x', legendRectSize + legendSpacing)              // NEW
            .attr('y', legendRectSize - legendSpacing)              // NEW
            .text(function(d) { return d; });                       // NEW
    };
    const init = () => {
        _intro();
    };
    return {
        init,
    };
})();
