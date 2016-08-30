/**
 * Created by riccardo on 24/08/2016.
 */
var delta = 15;
export const dataset = [
  {
    enabled: false,
    label: 'bundle',
    amt: 40,
    theme: {enabled: '#470a68', disabled: '#888888', fontColor: '#470a68'},
    logo: 'bundle',
  }, //dark purple
  {
    enabled: false,
    label: 'out of bundle',
    amt: 13.57,
    theme: {enabled: '#8b00ef', disabled: '#A2A2A2', fontColor: '#8b00ef'},
    logo: 'out-of-bundle',
  },  //eir purple
  {
    enabled: false,
    label: 'add ons',
    amt: 30.07 - delta,
    theme: {enabled: '#015672', disabled: '#737373', fontColor: '#015672'},
    logo: 'add-on',
  }, //dark turquoise
  {
    enabled: false,
    label: 'previous bills',
    amt: 24.61 + delta,
    theme: {enabled: '#018c15', disabled: '#888888', fontColor: '#018c15'},
    logo: 'unpaid-bill',
  }, //dark green
  {
    enabled: false,
    label: 'part period',
    amt: 46.13,
    theme: {enabled: '#ec8b00', disabled: '#A2A2A2', fontColor: '#ec8b00'},
    logo: 'part-period',
  },  //dark yellow
];

export const overview = {
  enabled: false,
  label: 'owed',
  amt: dataset.map((slice) => slice.amt).reduce((pre, cur) => pre + cur),
  theme: {
    enabled: '#ffffff',
    disabled: '#ffffff',
    fontColor: '#26272c',
  },
};
