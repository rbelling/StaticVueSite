/**
 * Created by riccardo on 24/08/2016.
 */
export const dataset = [
  { label: 'Bundle', amt: 40, theme: { enabled: '#470a69', disabled: '#747474' } },
  { label: 'Out of bundle costs', amt: 13.57, theme: { enabled: '#8d00ef', disabled: '#787878' } },
  { label: 'Add ons', amt: 30, theme: { enabled: '#015672', disabled: '#737373' } },
  { label: 'Previous Unpaid bills', amt: 49.61, theme: { enabled: '#018c15', disabled: '#888888' } },
  { label: 'Part period charges', amt: 40, theme: { enabled: '#ec8b00', disabled: '#A2A2A2' } },
];

export const overview = {
  label: 'Owed',
  amt: dataset.map((slice) => slice.amt).reduce((pre, cur) => pre + cur),
  theme: {
    enabled: '#ffffff',
    disabled: '#ffffff',
  },
};
