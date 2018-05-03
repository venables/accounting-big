'use strict';

import checkCurrencyFormat from './checkCurrencyFormat';
import defaults from './defaults';
import formatMoney from './formatMoney';
import isObject from './isObject';
import isString from './isString';
import settings from './settings';

/**
 * Format a list of numbers, with comma-separated thousands and custom
 * precision into a list of strings of the same length.
 *
 * @param {Array<String>|Array<Number>} list - The numbers to format
 * @param {String|Object} [precision=settings.currency.symbol] - The symbol to use, or an object containing settings
 * @param {Number} [precision=settings.currency.precision] - The precision to use, or an object containing settings
 * @param {String} [thousand=settings.currency.thousand] - The thousand separator
 * @param {String} [decimal=settings.currency.decimal] - The decimal separator
 * @param {String} [format=settings.currency.format] - The output format to use
 * @returns {String}
 */
function formatColumn(list, symbol, precision, thousand, decimal, format) {
  if (!list || !Array.isArray(list)) return [];

  const opts = defaults(
    (isObject(symbol) ? symbol : {
      symbol : symbol,
      precision : precision,
      thousand : thousand,
      decimal : decimal,
      format : format
    }),
    settings.currency
  );

  const formats = checkCurrencyFormat(opts.format);
  const padAfterSymbol = formats.pos.indexOf('%s') < formats.pos.indexOf('%v');
  let maxLength = 0;

  return list.map((val) => {
    if (Array.isArray(val)) {
      return formatColumn(val, opts);
    }

    const money = formatMoney(val, opts);
    maxLength = Math.max(maxLength, money.length);
    return money;
  }).map((val) => {
    if (isString(val) && val.length < maxLength) {
      if (padAfterSymbol) {
        return val.replace(opts.symbol, opts.symbol+(new Array(maxLength - val.length + 1).join(' ')));
      }

      return (new Array(maxLength - val.length + 1).join(' ')) + val;
    }

    return val;
  });
}

export default formatColumn;
