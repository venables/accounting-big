# Changelog

## master
* [FIXED] All operations support arbitrary-precision numbers (via `Big.js`, allowing values to go extremely large or precise.
* [NEW] - Rollup.js is used for release packaging.
* [NEW] - Tests use `ava` as a runner and `nyc` for coverage.
* [NEW] - Linting is performed by `eslint`

## Pre-fork changes:

### 0.4.2
* Added bower.json

### 0.4.1
* Alias `accounting.formatNumber()` as `accounting.format()`

### 0.4
* Transferred repository to Open Exchange Rates for ongoing maintenance

### 0.3.2
* Fixed package.json dependencies (should be empty object)

### 0.3.0
* Rewrote library structure similar to underscore.js for use as a nodeJS/npm and AMD module. Use `npm install accounting` and then `var accounting = require("accounting");` in your nodeJS scripts. 
* Also works with requireJS or any AMD module loader.
* **unformat** now only attempts to parse the number if it's not already a valid number. 
* `acounting.unformat` now also aliased as `acounting.parse`
* Fixed an IE bug in the `defaults` method

### 0.2.2
* Fixed same issue as \#Num: #24 in **formatNumber**; switch to Google Closure Compiler for minified version.

### 0.2.1
* Fixed issue \#Num: #24 (locally-defined settings object was being modified by **formatMoney**)

### 0.2
* Rewrote formatting system for **formatMoney** and **formatColumn** for better control of string output
* Now supports separate formats for negative and zero values (optionally) via `accounting.settings.currency.format`
* Internal improvements and helper methods

### 0.1.4
* **formatMoney** recursively formats arrays
* Added Jasmine test suite (thanks to [millermedeiros](https://github.com/millermedeiros)) and QUnit functionality/speed tests

### 0.1.3
* Added configurable settings object for default formatting parameters.
* Added `format` parameter to control symbol and value position (default `"%s%v"`, or [symbol][value])
* Methods consistently accept object as 2nd parameter, matching/overriding the library defaults

### 0.1.2
* **formatColumn** works recursively on nested arrays (e.g. `accounting.formatColumn( [[1,12,123,1234], [1234,123,12,1]] )`, returns matching array with inner columns lined up)
* Fix rounding in **formatNumber**

### 0.1.1
* Added **toFixed** method (`accounting.toFixed(value, precision)`), which treats floats more like decimals for more accurate currency rounding
* Minified version preserves semicolons
* Fixed `NaN` errors when no value in **unformat**

### 0.1
* First version
