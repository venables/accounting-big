'use strict';

import settings from './settings';
import unformatBig from './unformatBig';

/**
 * Implementation of `toFixed` which handles rounding correctly.
 *
 * @example
 *
 * toFixed(0.615)
 * // => "0.62"
 *
 * toFixed(0.1, 4)
 * // => "0.1000"
 *
 * @param {String|Number} value - The number to modify
 * @param {Number} [precision=settings.number.precision] - The precision to use
 * @returns {String}
 */
function toFixed(value, precision=settings.number.precision) {
  return unformatBig(value).toFixed(precision);
}

export default toFixed;
