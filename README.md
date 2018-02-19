# accounting-big

Arbitrary-precision number, money and currency formatting for the browser or the server.

`accounting-big` is a fork of [accounting.js](https://github.com/openexchangerates/accounting.js) which has been updated to support arbitrary-precision numbers.  It can handle **any number** without risk of rounding or precision errors, which is extremely important when working with money.

## Installation

```
yarn add accounting-big
```

## Usage

```js
import 'accounting' from 'accounting-big';

accounting.formatMoney('1234567.2');
// => "$1,234,567.20"
```

The full API can be found on the [accounting.js website](http://openexchangerates.github.io/accounting.js).


## Testing

```
yarn test
```
