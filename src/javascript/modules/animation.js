/* ============================
 =            GSAP            =
 ============================ */
import '../vendor/gsap/TweenMax';
import * as d3 from 'd3';
import dataset from '../dataset/piechart';

export default (() => {
  const _tl = new TimelineLite({
    paused: true,
  });
  const _intro = () => {
    let width = 225,
      height = 225,
      radius = Math.min(width, height) / 2,
      donutWidth = 45,
      legendRectSize = 18,
      legendSpacing = 4,
      color = d3.scaleOrdinal(d3.schemeCategory20b),
      svg = d3.select('.piechart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) +
          ',' + (height / 2) + ')');
    const arc = d3.arc()
      .innerRadius(radius - donutWidth)             // UPDATED
      .outerRadius(radius);
    const pie = d3.pie()
      .value(function (d) {
        return d.count;
      })
      .sort(null);
    const path = svg.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function (d, i) {
        return color(d.data.label);
      });

    const legend = svg.selectAll('.legend')                     // NEW
      .data(color.domain())                                   // NEW
      .enter()                                                // NEW
      .append('g')                                            // NEW
      .attr('class', 'legend')                                // NEW
      .attr('transform', function (d, i) {                     // NEW
        const height = legendRectSize + legendSpacing;          // NEW
        const offset = height * color.domain().length / 2;     // NEW
        const horz = -2 * legendRectSize;                       // NEW
        const vert = i * height - offset;                       // NEW
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
      .text(function (d) {
        return d;
      });                       // NEW
  };
  const init = () => {
    _intro();
  };
  return {
    init,
  };
})();
