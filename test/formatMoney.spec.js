'use strict';

const accounting = require('..');
const test = require('ava');

test('accounting.formatMoney() works for small numbers', (t) => {
  t.is(accounting.formatMoney(123), '$123.00');
  t.is(accounting.formatMoney(123.45), '$123.45');
  t.is(accounting.formatMoney(12345.67), '$12,345.67');
  t.is(accounting.formatMoney(12345678), '$12,345,678.00');
});

test('accounting.formatMoney() works for large numbers', (t) => {
  const opts = {
    precision: 18,
    symbol: 'ETH',
    format: '%v %s'
  };

  t.is(accounting.formatMoney('12345670.123456789123456789', opts), '12,345,670.123456789123456789 ETH');
  t.is(accounting.formatMoney('12345678901234567890.123456789123456789', opts), '12,345,678,901,234,567,890.123456789123456789 ETH');
});

test('accounting.formatMoney() works for negative numbers', (t) => {
  t.is(accounting.formatMoney(-123), '$-123.00');
  t.is(accounting.formatMoney(-123.45), '$-123.45');
  t.is(accounting.formatMoney(-12345.67), '$-12,345.67');
  t.is(accounting.formatMoney(-500000, '£ ', 0), '£ -500,000');
});

test('accounting.formatMoney() allows precision to be `0` and not override with default `2`', (t) => {
  t.is(accounting.formatMoney(5318008, '$', 0), '$5,318,008');
});

test('accounting.formatMoney() handles custom formatting options', (t) => {
  var format = {
    pos: '%s %v',
    neg: '%s (%v)',
    zero:'%s  --'
  };
  t.is(accounting.formatMoney(0, { symbol: 'GBP',  format: format }), 'GBP  --');
  t.is(accounting.formatMoney(-1000, { symbol: 'GBP',  format: format }), 'GBP (1,000.00)');
  t.is(accounting.formatMoney(1000, { symbol: 'GBP',  format: { neg: '--%v %s' }}), 'GBP1,000.00');

  accounting.settings.currency.format = '%s%v';
  accounting.formatMoney(0, {format: '' });
  t.is(typeof accounting.settings.currency.format, 'object');

  t.is(accounting.formatMoney(4999.99, '$ ', 2, '.', ','), '$ 4.999,99');
  t.is(accounting.formatMoney(5318008, { symbol: 'GBP',  format: '%v %s' }), '5,318,008.00 GBP');
  t.is(accounting.formatMoney(1000, { format: 'test %v 123 %s test' }), 'test 1,000.00 123 $ test');
});
