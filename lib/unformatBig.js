'use strict';

import Big from 'big.js';
import settings from './settings';

/**
 * Takes a string/array of strings, removes all formatting/cruft and returns
 * the raw number value as a Big.js object.
 *
 * @example
 *
 * unformatBig("$ 123,456.78")
 * // => new Big("123456.78")
 *
 * unformatBig("$(101.22)")
 * // => new Big("-101.22")
 *
 * @alias parseBig
 * @param {String|Array<String>} value - The number to parse/unformat
 * @param {String} [decimal=settings.number.decimal] - The decimal separator, if non-standard
 * @returns {Big} - The parsed number as a Big.js object
 */
function unformatBig(value = 0, decimal = settings.number.decimal) {
  if (Array.isArray(value)) {
    return value.map(val => unformatBig(val, decimal));
  }

  try {
    return new Big(value);
  } catch(err) {}

  const regex = new RegExp('[^0-9-' + decimal + ']', ['g']);
  const unformatted = `${value}`
    .replace(/\((?=\d+)(.*)\)/, '-$1') // replace bracketed values with negatives
    .replace(regex, '') // strip out any cruft
    .replace(decimal, '.'); // make sure decimal point is standard

  try {
    return new Big(unformatted);
  } catch (err) {
    return new Big(0);
  }
}

export default unformatBig;
