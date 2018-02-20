'use strict';

import isString from './isString';
import settings from './settings';

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

export default checkCurrencyFormat;
