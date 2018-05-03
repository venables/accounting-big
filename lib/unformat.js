'use strict';

import unformatBig from './unformatBig';

/**
 * Takes a string/array of strings, removes all formatting/cruft and returns
 * the raw number value as a Javascript `Number`.
 *
 * NOTE: You should opt to use `unformatBig` to prevent any rounding or
 * precision errors.
 *
 * @example
 *
 * unformat("$ 123,456.78")
 * // => "123456.78"
 *
 * unformat("$(101.22)")
 * // => "-101.22"
 *
 * @alias parse
 * @param {String|Array<String>} value - The number to parse/unformat
 * @param {String} [decimal=settings.number.decimal] - The decimal separator, if non-standard
 * @returns {Number} - The parsed Number
 */
function unformat(value, decimal) {
  const result = unformatBig(value, decimal);

  if (Array.isArray(result)) {
    return result.map(val => Number(val));
  }

  return Number(result);
}

export default unformat;
