/**
 * Created by riccardo on 24/08/2016.
 */
export const dataset = [
  { enabled: false, label: 'Bundle', amt: 40, theme: { enabled: '#470a68', disabled: '#54585a', fontColor: '#470a68'} }, //dark purple
  { enabled: false, label: 'Out of bundle costs', amt: 13.57, theme: { enabled: '#8b00ef', disabled: '#ececec',  fontColor: '#018c15' } },  //eir purple
  { enabled: false, label: 'Add ons', amt: 30, theme: { enabled: '#015672', disabled: '#737373',  fontColor: '#015672'} }, //dark turquoise
  { enabled: false, label: 'Previous Unpaid bills', amt: 49.61, theme: { enabled: '#018c15', disabled: '#888888', fontColor: '#8b00ef' } }, //dark green
  { enabled: false, label: 'Part period charges', amt: 40, theme: { enabled: '#ec8b00', disabled: '#A2A2A2', fontColor: '#ec8b00' } },  //dark yellow
];

export const overview = {
  enabled: false,
  label: 'Owed',
  amt: dataset.map((slice) => slice.amt).reduce((pre, cur) => pre + cur),
  theme: {
    enabled: '#ffffff',
    disabled: '#ffffff',
    fontColor: '#26272c',
  },
};
