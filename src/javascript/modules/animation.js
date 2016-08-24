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
      ChartWrapper = d3.select('.ChartWrapper')
        .append('svg')
        .classed('OuterChart', true)
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
        return d.amt;
      })
      .sort(null);
    const path = ChartWrapper.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function (d) {
        return d.data.theme.enabled;
      });

    let InnerChart = d3.select('.OuterChart').append( "circle" )
      .classed('InnerChart', true)
      .attr("r", radius - donutWidth )
      .attr("stroke","red")
      .attr("stroke-width", "3")
      .attr("fill", "white")
      .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');
  };
  const init = () => {
    _intro();
  };
  return {
    init,
  };
})();
