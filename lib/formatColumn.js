'use strict';

import formatMoney from './formatMoney';
import settings from './settings';

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
