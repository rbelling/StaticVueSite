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
    Logo: {
      size: 40,
    },
    pie: d3.pie()
      .value(function (d) {
        return d.amt;
      })
      .sort(null),
  },
  DURATION = {
    XXS: 175,
    XS: 250,
    S: 300,
    M: 500,
    L: 750,
    XL: 1500,
  };

export default (() => {
  const _initChart = () => {
    CHART.Wrapper.elt = d3.select('.ChartWrapper');

    CHART.OuterChart.elt = CHART.Wrapper.elt.append('svg')
      .classed('OuterChart', true)
      .attr('width', CHART.OuterChart.containerSize)
      .attr('height', CHART.OuterChart.containerSize);

    CHART.PathContainer = CHART.OuterChart.elt.append('g').classed('OuterChart__g-first', true)
      .attr('transform', `translate(${CHART.OuterChart.containerSize / 2}, ${CHART.OuterChart.containerSize / 2})`)
      .selectAll('path')
      .data(CHART.pie(dataset))
      .enter()
      .append('g')

    CHART.PathContainer
      .append('path')
      .attr('data-slice-id', function (d) {
        return d.data.label;
      })
      .classed('is-expanded', false)
      .attr('stroke-width', CHART.OuterChart.stroke)
      .attr('stroke', 'white')
      .on('click', function (d) {
        _.bind(_sectionClick, this)(d);
      })

    /**
     * Append the logo to each slide
     * http://jsfiddle.net/LLwr4q7s/
     */
    CHART.PathContainer.append("svg:image")
      .attr("transform", function (d) {
        return "translate(" + CHART.Arc.disabled.centroid(d) + ")";
      })
      .classed('SliceLogo', true)
      .attr('width', CHART.Logo.size)
      .attr('height', CHART.Logo.size)
      .attr('xlink:href', function (d) {
        return `./images/${d.data.logo}.svg`;
      })
      .attr("x", -1 * CHART.Logo.size / 2)
      .attr("y", -1 * CHART.Logo.size / 2);


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
     * 1) Remove is-expanded class from arcs that need to be collapsed
     * 2) Check the target section (T.S.) enabled status
     *  2.1) If T.S. is enabled OR if we need to go back to the overview
     *    2.1.1) Collapse T.S. (unless the target is overview, in which case no action is taken at this stage)
     *    2.1.2) Fill every section with their 'enabled' color - USING GSAP
     *  2.2) else (it means that we are focusing one specific section), unless T.S. is the center
     *    2.2.1) add is-expanded class to T.S.
     *    2.2.2) Enable T.S. and fill it with its 'enabled' color
     *    2.2.3) fill all other sections with their 'disabled' color - USING GSAP
     *  3) Change text content, fill, stroke to the T.S.
     */


      // 0) Check if we've clicked the center
    const $sectionToFocus = $(`[data-slice-id = '${sectionToFocus.label}']`),
      shouldDisplayOverview = sectionToFocus.label === overview.label;
    let circleStrokeColor = sectionToFocus.theme.enabled;

    //1) Remove is-expanded class from arcs that need to be collapsed
    CHART.OuterChart.elt.select('.OuterChart__g-first')
      .selectAll(`[data-slice-id]:not([data-slice-id='${sectionToFocus.label}'])`)
      .classed('is-expanded', false);

    //2) Check the target section expanded status
    const isExpanded = $sectionToFocus.hasClass('is-expanded');

    if (isExpanded || shouldDisplayOverview) {
      _collapseOtherSections();
      //2.2) If T.S. is enabled OR if we need to go back to the overview
      //2.1.1) Collapse T.S. (unless the target is overview, in which case no action is taken at this stage)
      if (!shouldDisplayOverview) {
        d3.selectAll(`[data-slice-id = '${sectionToFocus.label}']`)
          .classed('is-expanded', false);
      }
      //2.1.2) Fill every section with their 'enabled' color unless it's the overview element
      circleStrokeColor = overview.theme.enabled;
      _animateText(overview.label, '.ChartText__label', overview, DURATION.XS / 1000);
      _animateText(`€ ${overview.amt}`, '.ChartText__amt', overview);
    }
    else {
      // else (it means that we are focusing one specific section)
      // 2.2.1) add is-expanded class to T.S.
      // 2.2.2) Enable it and fill it with its 'enabled' color
      d3.selectAll(`[data-slice-id = '${sectionToFocus.label}']`)
        .classed('is-expanded', true)
        .transition()
        .duration(DURATION.S)
        .attr("d", CHART.Arc.enabled)
        .attr("fill", function (d) {
          return d.data.theme.enabled;
        });

      // fill all other sections with their 'disabled' color and collapse them
      d3.selectAll(`[data-slice-id]:not([data-slice-id='${sectionToFocus.label}'])`)
        .transition()
        .duration(DURATION.S)
        .attr("fill", function (d) {
          return d.data.theme.disabled;
        })
        .attr('d', CHART.Arc.disabled);
      _animateText(sectionToFocus.label, '.ChartText__label', sectionToFocus, DURATION.XXS / 1000);
      _animateText(`€ ${sectionToFocus.amt}`, '.ChartText__amt', sectionToFocus);
    }

    const tl = new TimelineLite();
    let _whatShouldScale = '.InnerChart'
    if (shouldDisplayOverview) {
      _whatShouldScale += ', .OuterChart';
    }
    tl.set('.InnerChart circle', {drawSVG: '0 0'})
    tl.to(_whatShouldScale, DURATION.XS / 1000, {
      scale: 0.9, ease: Linear.easeOut, onComplete: function () {
        _setInnerChartStroke(circleStrokeColor);
      }
    });
    tl.to(_whatShouldScale, DURATION.XXS / 1000, {scale: 1.03, ease: Back.easeOut});
    tl.to(_whatShouldScale, DURATION.XXS / 1000, {scale: 1, ease: Back.easeOut})
    tl.play();

  };
  const _setInnerChartStroke = (strokeColor = overview.theme.enabled) => {
    const strokeLength = 500;
    const beginningOffset = 65;//Math.random() * 100;
    // TweenLite.from('.InnerChart circle', 1, {rotation: 95});
    TweenLite.fromTo('.InnerChart circle', DURATION.S / 1000, {
      stroke: strokeColor,
      drawSVG: `${beginningOffset}% ${beginningOffset}%`,
    }, {
      ease: Power2.easeOut,
      drawSVG: '0% 100%',
    });
  };
  const _animateText = (_value, targetSelector, sectionToFocus, delay = 0) => {
    const tl = new TimelineLite();
    tl.to(targetSelector, DURATION.XS / 1000, {autoAlpha: 0, scale: 0.9, ease: Back.easeOut});
    tl.set(targetSelector, {text: _value, fill: sectionToFocus.theme.fontColor});
    tl.to(targetSelector, DURATION.S / 1000, {autoAlpha: 1, delay, scale: 1, ease: Back.easeOut});

    tl.play();
  };
  const _collapseOtherSections = (unlessItIs = null) => {
    const mySelector = unlessItIs ? `[data-slice-id]:not([data-slice-id='${unlessItIs}'])` : `[data-slice-id]`;
    CHART.OuterChart.elt.select('.OuterChart__g-first')
      .selectAll(mySelector)
      .transition()
      .duration(DURATION.M)
      .attr('d', CHART.Arc.disabled)
      .duration(DURATION.M)
      .attr("fill", function (d) {
        return d.data.theme.enabled;
      });
  };
  const _sectionClick = (d) => {
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

    setTimeout(function () {
      // INIT THE CHART AND FOCUS ON THE 'OVERVIEW' STATE
      _initChart();
      _focusSection(overview);

      TweenLite.set('.OuterChart', {scale: '.7', autoAlpha: '.6', rotation: '-70'});
      TweenLite.to('.OuterChart', DURATION.M / 1000, {autoAlpha: '1'});
      TweenLite.to('.OuterChart', DURATION.L / 1000, {scale: '1'});
      TweenLite.to('.OuterChart', DURATION.XL / 1000, {rotation: 0, ease: Expo.easeOut});
    }, 400);
  };
  return {
    init,
  };
})();
