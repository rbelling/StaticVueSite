/* ============================
 =            GSAP            =
 ============================ */
import '../vendor/gsap/TweenMax';
import * as d3 from 'd3';
import _ from 'lodash';
import {dataset, overview} from '../dataset/piechart';


const CHART = {
    Wrapper: {
      elt: _.noop,
    },
    OuterChart: {
      size: 225,
      containerSize: 300,
      donutWidth: 45,
      stroke: 4,
      elt: _.noop,
    },
    InnerChart: {
      size: 142,
      stroke: 3,
      elt: _.noop,
    },
    Text: {
      elt: _.noop,
      Label: {
        elt: _.noop,
      },
      Amt: {
        elt: _.noop,
      },
    },
    Arc: {
      enabled: _.noop,
      disabled: _.noop,
    },
    pie: d3.pie()
      .value(function (d) {
        return d.amt;
      })
      .sort(null),
  },
  DURATION = {
    XS: 300,
    S: 500,
    M: 700,
    L: 1000,
    XL: 2000,
  };

export default (() => {
  const _initChart = () => {
    CHART.Wrapper.elt = d3.select('.ChartWrapper');

    CHART.OuterChart.elt = CHART.Wrapper.elt.append('svg')
      .classed('OuterChart', true)
      .attr('width', CHART.OuterChart.containerSize)
      .attr('height', CHART.OuterChart.containerSize);

    CHART.OuterChart.elt.append('g').classed('OuterChart__g-first', true)
      .attr('transform', `translate(${CHART.OuterChart.containerSize / 2}, ${CHART.OuterChart.containerSize / 2})`)
      .selectAll('path')
      .data(CHART.pie(dataset))
      .enter()
      .append('path')
      .attr('data-slice-id', function (d) {
        return d.data.label;
      })
      .classed('is-expanded', false)
      .attr('stroke-width', CHART.OuterChart.stroke)
      .attr('stroke', 'white')
      .on('click', function (d) {
        _.bind(_sectionClick, this)(d);
      });

    CHART.InnerChart.elt = CHART.Wrapper.elt
      .append('svg')
      .classed('InnerChart', true)
      .attr('width', CHART.InnerChart.size)
      .attr('height', CHART.InnerChart.size)
      .on('click', () => {
        _focusSection(overview);
      });

    CHART.InnerChart.elt
      .append("circle")
      .attr("r", Math.ceil((CHART.InnerChart.size / 2) - (CHART.InnerChart.stroke / 2 )))
      .attr('transform', `translate(
        ${(CHART.InnerChart.size / 2)}, 
        ${(CHART.InnerChart.size / 2)})`)
      .attr("stroke-width", "3")
      .attr("fill", "white");

    CHART.Text.elt = CHART.InnerChart.elt
      .append('g')
      .classed('ChartText', true)
      .attr('text-anchor', 'middle')

    CHART.Text.Amt.elt = CHART.Text.elt
      .append("text")
      .attr('transform', `translate(
        ${(CHART.InnerChart.size / 2)}, 
        ${78}  
      )`)
      .classed('ChartText__amt', true);

    CHART.Text.Label.elt = CHART.Text.elt
      .append("text")
      .attr('transform', `translate(
        ${(CHART.InnerChart.size / 2)}, 
        ${102}
        )`)
      .classed('ChartText__label', true);

  };
  const _focusSection = (sectionToFocus) => {
    /**
     * 0) Check if we've clicked the center
     * 1) Collapse all other sections
     * 2) Check the target section enabled status
     *  2.1) If it is enabled (meaning we need to go back to the overview)
     *    2.1.1) Collapse it
     *    2.1.2) Fill every section with their 'enabled' color
     *  2.2) else (it means that we are focusing one specific section), unless it is the center
     *    2.2.1) Enable it and fill it with its 'enabled' color
     *    2.2.2) fill all other sections with their 'disabled' color
     *  3) Change text content, fill, stroke to the correct target section
     *  4) fix class
     */

    const $sectionToFocus = $(`[data-slice-id = '${sectionToFocus.label}']`),
      shouldDisplayOverview = sectionToFocus.label === overview.label;

    //1) Collapse all other sections
    CHART.OuterChart.elt.select('.OuterChart__g-first')
      .selectAll(`[data-slice-id]:not([data-slice-id='${sectionToFocus.label}'])`)
      .classed('is-expanded', false)
      .attr('d', CHART.Arc.disabled)


    //2) Check the target section expanded status
    const isExpanded = $sectionToFocus.hasClass('is-expanded');

    if (isExpanded || shouldDisplayOverview) {
      //2.2) If it is enabled (meaning we need to go back to the overview)
      //2.1.1) Collapse it unless it shouldDisplayOverview
      if (!shouldDisplayOverview) {
        d3.selectAll(`[data-slice-id = '${sectionToFocus.label}']`)
          .classed('is-expanded', false)
          .transition()
          .duration(DURATION.M)
          .attr("d", CHART.Arc.disabled);
      }

      //2.1.2) Fill every section with their 'enabled' color unless it's the overview element
      d3.selectAll(`[data-slice-id]:not([data-slice-id='${overview.label}']):not([data-slice-id='${sectionToFocus.label}'])`)
        .transition()
        .duration(DURATION.M)
        .attr("fill", function (d) {
          return d.data.theme.enabled;
        });
      CHART.InnerChart.elt.transition().duration(DURATION.M).attr("stroke", overview.theme.enabled);
      CHART.Text.Label.elt.transition().duration(DURATION.M).text(overview.label)
        .attr('fill', overview.theme.fontColor);
      CHART.Text.Amt.elt.transition().duration(DURATION.M).text(`€ ${overview.amt}`)
        .attr('fill', overview.theme.fontColor);
    }
    else {
      // else (it means that we are focusing one specific section)
      // 2.2.1) Enable it and fill it with its 'enabled' color
      d3.selectAll(`[data-slice-id = '${sectionToFocus.label}']`)
        .classed('is-expanded', true)
        .transition()
        .duration(DURATION.S)
        .attr("d", CHART.Arc.enabled)
        .attr("fill", function (d) {
          return d.data.theme.enabled;
        });

      // fill all other sections with their 'disabled' color
      d3.selectAll(`[data-slice-id]:not([data-slice-id='${sectionToFocus.label}'])`)
        .transition()
        .duration(DURATION.S)
        .attr("fill", function (d) {
          return d.data.theme.disabled;
        });
      CHART.InnerChart.elt.transition().duration(DURATION.M).attr("stroke", sectionToFocus.theme.enabled);
      CHART.Text.Label.elt.text(sectionToFocus.label)
        .transition()
        .duration(DURATION.M)
        .attr('fill', sectionToFocus.theme.fontColor);
      CHART.Text.Amt.elt.text(`€ ${sectionToFocus.amt}`)
        .transition()
        .duration(DURATION.M)
        .attr('fill', sectionToFocus.theme.fontColor);
    }

  };
  const _sectionClick = function (d) {
    /**
     * Chiama _focusSection con la sezione cliccata (reale o overview).
     */

    const sectionId = d.data.label,
      $selectedSlice = $(`[data-slice-id = '${sectionId}']`);

    const sectionToFocus = dataset.find((e) => {
        return e.label === sectionId;
      }) || overview;

    _focusSection(sectionToFocus);
  };
  const init = () => {
    CHART.OuterChart.size += 2 * CHART.OuterChart.stroke;
    CHART.InnerChart.size += 2 * CHART.InnerChart.stroke;
    CHART.Arc.disabled = d3.arc()
      .innerRadius((CHART.OuterChart.size / 2) - CHART.OuterChart.donutWidth)
      .outerRadius(CHART.OuterChart.size / 2);
    CHART.Arc.enabled = d3.arc()
      .innerRadius((CHART.OuterChart.size / 2) - CHART.OuterChart.donutWidth)
      .outerRadius((CHART.OuterChart.size / 2) + 15);

    // INIT THE CHART AND FOCUS ON THE 'OVERVIEW' STATE
    _initChart();
    _focusSection(overview);

    TweenLite.set('.OuterChart', {scale: '.6', rotation: '-90'});
    TweenLite.to('.OuterChart', 1, {scale: '1', y: '0'});
    TweenLite.to('.OuterChart', 2.5, {rotation: 0, ease: Expo.easeOut});
  };
  return {
    init,
  };
})();
