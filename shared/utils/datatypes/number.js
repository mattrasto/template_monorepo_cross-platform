const { millify } = require('millify');

export const formatNumberToKUnits = (num) => {
  return Math.abs(num) > 999
    ? `${Math.sign(num) * (Math.abs(num) / 1000).toFixed(0)}K`
    : Math.sign(num) * Math.abs(num);
};

export const millifyNumber = (number, addSpace) => {
  return millify(number, {
    space: addSpace
  });
};

export const formatNumberToThousands = (val) => parseInt(val, 10).toLocaleString();

// Rounds a number to a specified multiple
// Eg. (123, 10) => 120
export const roundToMultiple = (num, multiple) => Math.round(num / multiple) * multiple;

// Suffixes standard short scale number symbols (k, M, B, T)
// Reference: https://en.wikipedia.org/wiki/Names_of_large_numbers
// maxPrecision: number of decimal significant figures to keep
export const formatNumberSymbol = (number, maxPrecision = 0) => {
  const NUMBER_SYMBOLS = ['', 'k', 'M', 'B', 'T'];
  if (!number) return 0;
  // Compute tier (thousands)
  const tier = Math.floor(Math.log10(Math.abs(number)) / 3 || 0);
  // Compute suffix and scale
  const suffix = NUMBER_SYMBOLS[tier];
  const scale = 10 ** (tier * 3);
  const scaledNum = number / scale;
  // Compute and format decimal portion to only keep significant figures
  let decimalPortion = (Math.round((scaledNum % 1) * 1000) / 1000)
    .toString()
    .slice(1, maxPrecision + 2);
  if (decimalPortion.length < 2) decimalPortion = '';
  return `${Math.floor(scaledNum)}${decimalPortion}${suffix}`;
};
