'use strict';

const accounting = require('..');
const test = require('ava');

test('accounting.toFixed()', (t) => {
  t.is(accounting.toFixed(54321, 5), '54321.00000');
  t.is(accounting.toFixed(0.615, 2), '0.62');
});
