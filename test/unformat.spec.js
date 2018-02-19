'use strict';

const accounting = require('..');
const test = require('ava');

test('accounting.unformat() handles standard currency values', (t) => {
  t.is(accounting.unformat('$12,345,678.90 USD'), 12345678.9);
  t.is(accounting.unformat(1234567890), 1234567890);
});

test('accounting.unformat() removes padding special chars', (t) => {
  t.is(accounting.unformat('$ 123,456'), 123456);
  t.is(accounting.unformat('$ 123,456.78'), 123456.78);
  t.is(accounting.unformat('&*()$ 123,456'), 123456);
  t.is(accounting.unformat(';$@#$%^&123,456.78'), 123456.78);
});

test('accounting.unformat() works with negative numbers', (t) => {
  t.is(accounting.unformat('$ -123,456'), -123456);
  t.is(accounting.unformat('$ -123,456.78'), -123456.78);
  t.is(accounting.unformat('&*()$ -123,456'), -123456);
  t.is(accounting.unformat('&*()$(123,456)A$@P'), -123456);
  t.is(accounting.unformat(';$@#$%^&-123,456.78'), -123456.78);
});

test('accounting.unformat() accepts different decimal separators', (t) => {
  t.is(accounting.unformat('$ 123,456', ','), 123.456);
  t.is(accounting.unformat('$ 123456|78', '|'), 123456.78);
  t.is(accounting.unformat('&*()$ 123>456', '>'), 123.456);
  t.is(accounting.unformat(';$@#$%^&123,456\'78', '\''), 123456.78);

  accounting.settings.number.decimal = ',';
  t.is(accounting.unformat('¤1.000,00'), 1000);
  t.is(accounting.unformat('100,00'), 100);
  accounting.settings.number.decimal = '.';
});

test('accounting.unformat() accepts an array', (t) => {
  var vals = accounting.unformat(['$ 123', '$567.89', 'R$12,345,678.901']);
  t.is(vals[0], 123);
  t.is(vals[1], 567.89);
  t.is(vals[2], 12345678.901);
});

test('handles invalid input', (t) => {
  t.is(accounting.unformat('string'), 0);
  t.is(accounting.unformat({ joss: 1 }), 0);
});
