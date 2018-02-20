'use strict';

import formatNumber from './formatNumber';
import settings from './settings';
import unformatBig from './unformatBig';

function isObject(obj) {
  return obj && toString.call(obj) === '[object Object]';
}

function defaults(object, defs) {
  var key;
  object = object || {};
  defs = defs || {};
  // Iterate over object non-prototype properties:
  for (key in defs) {
    if (defs.hasOwnProperty(key)) {
      // Replace values with defaults only if undefined (allow empty/zero values):
      if (object[key] == null) object[key] = defs[key];
    }
  }
  return object;
}

/**
 * Tests whether supplied parameter is a string
 * from underscore.js
 */
function isString(obj) {
  return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
}

/**
 * Parses a format string or object and returns format obj for use in rendering
 *
 * `format` is either a string with the default (positive) format, or object
 * containing `pos` (required), `neg` and `zero` values (or a function returning
 * either a string or object)
 *
 * Either string or format.pos must contain "%v" (value) to be valid
 */
function checkCurrencyFormat(format) {
  var defaults = settings.currency.format;

  // Allow function as format parameter (should return string or object):
  if ( typeof format === 'function' ) format = format();

  // Format can be a string, in which case `value` ("%v") must be present:
  if ( isString( format ) && format.match('%v') ) {

    // Create and return positive, negative and zero formats:
    return {
      pos : format,
      neg : format.replace('-', '').replace('%v', '-%v'),
      zero : format
    };

    // If no format, or object is missing valid positive value, use defaults:
  } else if ( !format || !format.pos || !format.pos.match('%v') ) {

    // If defaults is a string, casts it to an object for faster checking next time:
    return ( !isString( defaults ) ) ? defaults : settings.currency.format = {
      pos : defaults,
      neg : defaults.replace('%v', '-%v'),
      zero : defaults
    };

  }
  // Otherwise, assume format was fine:
  return format;
}

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
