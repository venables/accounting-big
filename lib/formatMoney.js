'use strict';

import checkCurrencyFormat from './checkCurrencyFormat';
import defaults from './defaults';
import formatNumber from './formatNumber';
import isObject from './isObject';
import settings from './settings';
import unformatBig from './unformatBig';


/**
 * Format a number, with comma-separated thousands and custom precision into
 * a currency.
 *
 * @example
 *
 * formatMoney(123456.78)
 * // => "$123,456.78"
 *
 * formatMoney(123456.78, { format: '%v %s' })
 * // => "123,456.78 $"
 *
 * formatMoney(123456.78, '#', 3, '.', ',')
 * // => "#123.456,780"
 *
 * formatMoney(123456.78, { precision:  3 })
 * // => "$123,456.780"
 *
 * @param {String|Number} number - The number to format
 * @param {String|Object} [precision=settings.currency.symbol] - The symbol to use, or an object containing settings
 * @param {Number} [precision=settings.currency.precision] - The precision to use, or an object containing settings
 * @param {String} [thousand=settings.currency.thousand] - The thousand separator
 * @param {String} [decimal=settings.currency.decimal] - The decimal separator
 * @param {String} [format=settings.currency.format] - The output format to use
 * @returns {String}
 */
function formatMoney(number, symbol, precision, thousand, decimal, format) {
  if (Array.isArray(number)) {
    return number.map(val => formatMoney(val, symbol, precision, thousand, decimal, format));
  }

  number = unformatBig(number);

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
  const useFormat = number.gt(0) ? formats.pos : number.lt(0) ? formats.neg : formats.zero;
  return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(number.abs(), opts.precision, opts.thousand, opts.decimal));
}

export default formatMoney;
