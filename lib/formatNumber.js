'use strict';

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
 * Format a number, with comma-separated thousands and custom precision.
 *
 * @example
 *
 * formatNumber(123456.78)
 * // => "123,456.78"
 *
 * formatNumber(123456.78, 3, '.', ',')
 * // => "123.456,780"
 *
 * formatNumber(123456.78, { precision:  3 })
 * // => "123,456.780"
 *
 * @alias format
 * @param {String|Number} number - The number to format
 * @param {Number|Object} [precision=settings.number.precision] - The precision to use, or an object containing settings
 * @param {String} [thousand=settings.number.thousand] - The thousand separator
 * @param {String} [decimal=settings.number.decimal] - The decimal separator
 * @returns {String}
 */
function formatNumber(number, precision, thousand, decimal) {
  if (Array.isArray(number)) {
    return number.map(val => formatNumber(val, precision, thousand, decimal));
  }

  number = unformatBig(number);

  // Build options object from second param (if object) or all params, extending defaults:
  const opts = defaults(
    (isObject(precision) ? precision : {
      precision : precision,
      thousand : thousand,
      decimal : decimal
    }),
    settings.number
  );

  const negative = number.lt(0) ? '-' : '';
  const numberParts = number.abs().toFixed(opts.precision).split('.');
  const base = numberParts[0];
  let result = negative;

  result += base.replace(/\B(?=(\d{3})+(?!\d))/g, opts.thousand);

  if (opts.precision) {
    result += opts.decimal + numberParts[1];
  }

  return result;
}

export default formatNumber;
