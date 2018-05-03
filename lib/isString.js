'use strict';

function isString(obj) {
  return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
}

export default isString;
