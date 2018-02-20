'use strict';

function isObject(obj) {
  return obj && toString.call(obj) === '[object Object]';
}

export default isObject;
