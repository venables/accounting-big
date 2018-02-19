'use strict';

const accounting = require('..');
const test = require('ava');

test('accounting.formatNumber() enforces precision and round values', (t) => {
  t.is(accounting.formatNumber(123.456789, 0), '123');
  t.is(accounting.formatNumber(123.456789, 1), '123.5');
  t.is(accounting.formatNumber(123.456789, 2), '123.46');
  t.is(accounting.formatNumber(123.456789, 3), '123.457');
  t.is(accounting.formatNumber(123.456789, 4), '123.4568');
  t.is(accounting.formatNumber(123.456789, 5), '123.45679');
  t.is(accounting.formatNumber(0.615, 2), '0.62');
});

test('accounting.formatNumber() fixes floating point rounding error', (t) => {
  t.is(accounting.formatNumber(0.615, 2), '0.62');
  t.is(accounting.formatNumber(0.614, 2), '0.61');
  t.is(accounting.formatNumber(1.005, 2), '1.01');
});

test('accounting.formatNumber() works for large numbers', (t) => {
  t.is(accounting.formatNumber(123456.54321, 0), '123,457');
  t.is(accounting.formatNumber(123456.54321, 1), '123,456.5');
  t.is(accounting.formatNumber(123456.54321, 2), '123,456.54');
  t.is(accounting.formatNumber(123456.54321, 3), '123,456.543');
  t.is(accounting.formatNumber(123456.54321, 4), '123,456.5432');
  t.is(accounting.formatNumber(123456.54321, 5), '123,456.54321');

  t.is(accounting.formatNumber(98765432.12, 0), '98,765,432');
  t.is(accounting.formatNumber(98765432.12, 1), '98,765,432.1');
  t.is(accounting.formatNumber(98765432.12, 2), '98,765,432.12');
  t.is(accounting.formatNumber(98765432.12, 3), '98,765,432.120');
  t.is(accounting.formatNumber(98765432.12, 4), '98,765,432.1200');

  t.is(accounting.formatNumber('12345670.123456789123456789', { precision: 18 }), '12,345,670.123456789123456789');
  t.is(accounting.formatNumber('12345678901234567890.123456789123456789', { precision: 18 }), '12,345,678,901,234,567,890.123456789123456789');
});

test('accounting.formatNumber() works for negative numbers', (t) => {
  t.is(accounting.formatNumber(-123456.54321, 0), '-123,457');
  t.is(accounting.formatNumber(-123456.54321, 1), '-123,456.5');
  t.is(accounting.formatNumber(-123456.54321, 2), '-123,456.54');
  t.is(accounting.formatNumber(-123456.54321, 3), '-123,456.543');
  t.is(accounting.formatNumber(-123456.54321, 4), '-123,456.5432');
  t.is(accounting.formatNumber(-123456.54321, 5), '-123,456.54321');

  t.is(accounting.formatNumber(-98765432.12, 0), '-98,765,432');
  t.is(accounting.formatNumber(-98765432.12, 1), '-98,765,432.1');
  t.is(accounting.formatNumber(-98765432.12, 2), '-98,765,432.12');
  t.is(accounting.formatNumber(-98765432.12, 3), '-98,765,432.120');
  t.is(accounting.formatNumber(-98765432.12, 4), '-98,765,432.1200');

  t.is(accounting.formatNumber('-12345670.123456789123456789', { precision: 18 }), '-12,345,670.123456789123456789');
  t.is(accounting.formatNumber('-12345678901234567890.123456789123456789', { precision: 18 }), '-12,345,678,901,234,567,890.123456789123456789');
});


test('accounting.formatNumber() allows setting thousands separator', (t) => {
  t.is(accounting.formatNumber(98765432.12, 0, '|'), '98|765|432');
  t.is(accounting.formatNumber(98765432.12, 1, '>'), '98>765>432.1');
  t.is(accounting.formatNumber(98765432.12, 2, '*'), '98*765*432.12');
  t.is(accounting.formatNumber(98765432.12, 3, '\''), '98\'765\'432.120');
  t.is(accounting.formatNumber(98765432.12, 4, ']'), '98]765]432.1200');
});


test('accounting.formatNumber() allows setting decimal separator', (t) => {
  t.is(accounting.formatNumber(98765432.12, 0, null, '|'), '98,765,432');
  t.is(accounting.formatNumber(98765432.12, 1, null, '>'), '98,765,432>1');
  t.is(accounting.formatNumber(98765432.12, 2, null, '*'), '98,765,432*12');
  t.is(accounting.formatNumber(98765432.12, 3, null, '\''), '98,765,432\'120');
  t.is(accounting.formatNumber(98765432.12, 4, null, ']'), '98,765,432]1200');
});

test('accounting.formatNumber() allows setting thousand and decimal separators', (t) => {
  t.is(accounting.formatNumber(98765432.12, 0, '\\', '|'), '98\\765\\432');
  t.is(accounting.formatNumber(98765432.12, 1, '<', '>'), '98<765<432>1');
  t.is(accounting.formatNumber(98765432.12, 2, '&', '*'), '98&765&432*12');
  t.is(accounting.formatNumber(98765432.12, 3, '\'', '\''), '98\'765\'432\'120');
  t.is(accounting.formatNumber(98765432.12, 4, '[', ']'), '98[765[432]1200');
  t.is(accounting.formatNumber(4999.99, 2, '.', ','), '4.999,99');
});

test('accounting.formatNumber() uses default separators if null', (t) => {
  t.is(accounting.formatNumber(12345.12345, 2, null, null), '12,345.12');
});

test('accounting.formatNumber() uses empty separators if passed as empty string', (t) => {
  t.is(accounting.formatNumber(12345.12345, 2, '', ''), '1234512');
});


test('accounting.formatNumber() handles an array of numbers', (t) => {
  var vals = accounting.formatNumber([123, 456.78, 1234.123], 2);

  t.is(vals[0], '123.00');
  t.is(vals[1], '456.78');
  t.is(vals[2], '1,234.12');
});

test('accounting.formatNumber() can recursively format multi-dimensional array', (t) => {
  var numbers = [8008135, [1234, 5678], 1000];
  var formattedManually = [accounting.formatNumber(8008135), [accounting.formatNumber(1234), accounting.formatNumber(5678)], accounting.formatNumber(1000)];
  var formattedRecursively = accounting.formatNumber(numbers);
  t.is(formattedRecursively.toString(), formattedManually.toString());
});

test('accounting.formatNumber() accepts a properties object', (t) => {
  var val = accounting.formatNumber(123456789.1234, {
    thousand : '.',
    decimal : ',',
    precision : 3
  });

  t.is(val, '123.456.789,123');

  val = accounting.formatNumber(5318008, {
    precision : 3,
    thousand : '__',
    decimal : '--'
  });

  t.is(val, '5__318__008--000');
});

test('accounting.formatNumber() properties are optional', (t) => {
  var val = accounting.formatNumber(123456789.1234, {});
  t.is(val, '123,456,789');
});
