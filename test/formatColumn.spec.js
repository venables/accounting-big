'use strict';

const accounting = require('..');
const test = require('ava');

test('accounting.formatColumn() works as expected', (t) => {
  // standard usage:
  var list = [123, 12345];
  t.is(accounting.formatColumn(list, '$ ', 0).toString(), (['$    123', '$ 12,345']).toString());
});

test('accounting.formatColumn() works on multi-dimensional array', (t) => {
  // multi-dimensional array (formatColumn should be applied recursively):
  var list = [[1, 100], [900, 9]];
  t.is(accounting.formatColumn(list).toString(), ([['$  1.00', '$100.00'], ['$900.00', '$  9.00']]).toString());
});


test('accounting.formatColumn() with 3 random numbers returned strings of matching length', (t) => {
  // random numbers, must come back same length:
  var column = accounting.formatColumn([Math.random(), Math.random() * 1000, Math.random() * 10000000]);
  t.true((column[0].length === column[2].length && column[1].length === column[2].length));
});


test('formatColumn() with 3 random numbers returned strings of matching length, even with a weird custom `format` parameter', (t) => {
  // random numbers, must come back same length:
  var column = accounting.formatColumn([Math.random(), Math.random() * 1000, Math.random() * 10000000], {
    format: '(%v] --++== %s',
    thousand: ')(',
    decimal: ')[',
    precision: 3
  });
  t.true((column[0].length === column[2].length && column[1].length === column[2].length));
});
