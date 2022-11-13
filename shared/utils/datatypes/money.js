// Formats a price
// format: 'short' (eg. '270K') else 'simple' (eg. $270,123)
export const formatPriceFunc = (price, format) => {
  /* eslint-disable no-else-return */
  if (format === 'short') {
    if (!price && price !== 0) return 'N/A';
    if (Math.abs(price) < 1000) return `$${price}`;
    if (Math.abs(price) < 1000000) return `$${Math.floor(price / 1000)}K`;
    return `$${Math.floor(price / 10000) / 100}M`;
  } else if (format === 'thousands') {
    if ((!price && price !== 0) || price === 'N/A') return 'N/A';
    return `$${(Math.round(price / 100) * 100).toLocaleString()}`;
  } else {
    if ((!price && price !== 0) || price === 'N/A') return 'N/A';
    return `$${parseInt(price, 10).toLocaleString()}`;
  }
};

export const formatPriceRange = (priceRange, format) => {
  if (!priceRange) return 'N/A';
  if (!isFinite(priceRange[0]) || !isFinite(priceRange[1])) return 'N/A'; // eslint-disable-line no-restricted-globals
  if (priceRange[0] === priceRange[1])
    return `${formatPriceFunc(priceRange[0], format)}`;
  if (format === 'shortRange')
    return `${formatPriceFunc(priceRange[0], 'short')} - ${formatPriceFunc(
      priceRange[1],
      'short'
    )}`;
  return `${formatPriceFunc(priceRange[0], format)} - ${formatPriceFunc(
    priceRange[1],
    format
  )}`;
};

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  // (causes 2500.99 to be printed as $2,501)
  minimumFractionDigits: 0,
  maximumFractionDigits: 1
});

export const formatNumberToMoney = (val) => moneyFormatter.format(val);
