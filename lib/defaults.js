'use strict';

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

export default defaults;
