/* ============================
 =            GSAP            =
 ============================ */
import '../vendor/gsap/TweenMax';
import * as d3 from 'd3';
import {dataset, overview} from '../dataset/piechart';

const CHART = {
  OuterChart: {
    size: 225 + 4,
    donutWidth: 45,
    stroke: 4,
  },
  InnerChart: {
    size: 140,
    stroke: 3,
  },
}

export default (() => {
  const _tl = new TimelineLite({
    paused: true,
  });
  const _resetChart = (focusedSection = overview) => {
    let ChartWrapper = d3.select('.ChartWrapper')
        .append('svg')
        .classed('OuterChart', true)
        .attr('width', CHART.OuterChart.size)
        .attr('height', CHART.OuterChart.size)
        .append('g')
        .attr('transform', `translate(${CHART.OuterChart.size / 2}, ${CHART.OuterChart.size / 2})`);

    const arc = d3.arc()
      .innerRadius(CHART.OuterChart.size / 2 - CHART.OuterChart.donutWidth)             // UPDATED
      .outerRadius(CHART.OuterChart.size / 2)

    const pie = d3.pie()
      .value(function (d) {
        return d.amt;
      })
      .sort(null);
    const path = ChartWrapper.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('data-slice-id', function (d) {
        return d.data.label;
      })
      .attr('d', arc)
      .attr('fill', function (d) {
        return d.data.theme.enabled;
      })
      .attr('stroke-width', CHART.OuterChart.stroke)
      .attr('stroke', 'white');

    let InnerChart = d3.select('.ChartWrapper')
      .append('svg')
      .classed('InnerChart', true)
      .attr('width', CHART.InnerChart.size + (CHART.OuterChart.stroke * 2))
      .attr('height', CHART.InnerChart.size + (CHART.OuterChart.stroke * 2))

    InnerChart
      .append("circle")
      .attr("r", ((CHART.InnerChart.size / 2) - CHART.InnerChart.stroke) + CHART.OuterChart.stroke)
      .attr('transform', `translate(
        ${(CHART.InnerChart.size / 2) + CHART.OuterChart.stroke}, 
        ${(CHART.InnerChart.size / 2) + CHART.OuterChart.stroke})
      `)
      .attr("stroke", "red")
      .attr("stroke-width", "3")
      .attr("fill", "white");

    InnerChart
      .append('g')
      .classed('ChartText', true)
      .attr('width', CHART.InnerChart.size)
      .attr('height', CHART.InnerChart.size)
      .attr('transform', `translate(${CHART.InnerChart.size / 2}, ${CHART.InnerChart.size / 2})`)
      .attr('transform-origin', 'center')

    d3.select('.ChartText')
      .append("text")
      .classed('ChartText_label', true)
      .text(focusedSection.label)

    d3.select('.ChartText')
      .append("text")
      .classed('ChartText_amt', true)
      .text(focusedSection.amt)
  };
  const _intro = () => {
    _resetChart();
    TweenLite.set('.OuterChart', { scale: '.8', rotation: '-40' } );
    TweenLite.to('.OuterChart', 0.8, { scale: '1', y: '0' });
    TweenLite.to('.OuterChart', 2, { rotation: 0, ease: Expo.easeOut });
  };
  const init = () => {
    _intro();
  };
  return {
    init,
  };
})();
