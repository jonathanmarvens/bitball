# bitball

*A simple, efficient, and easy-to-use Node.js module for working with individual bits.*

[![Travis CI](https://img.shields.io/travis/jonathanmarvens/bitball/master.svg?style=flat-square)](https://travis-ci.org/jonathanmarvens/bitball)
[![npm](https://img.shields.io/npm/v/bitball.svg?style=flat-square)](https://www.npmjs.com/package/bitball)
[![npm downloads](https://img.shields.io/npm/dt/bitball.svg?style=flat-square)](https://www.npmjs.com/package/bitball)

```sh
npm i --save bitball
```

## Documentation.

### Example.

```javascript
'use strict'

var bitball
var flagSet

bitball = require('bitball')

flagSet = new bitball.BitSet(18) // Defaults to 8 bits if a size isn't provided.

console.log('flagSet{0}: ' + ((flagSet.get(0) === true) ? '1' : '0'))
console.log('flagSet{17}: ' + ((flagSet.get(17) === true) ? '1' : '0'))
flagSet.set(17, true)
console.log('flagSet{17}: ' + ((flagSet.get(17) === true) ? '1' : '0'))
flagSet.flip(17)
console.log('flagSet{17}: ' + ((flagSet.get(17) === true) ? '1' : '0'))

// Take a look at the tests.
```

### API.

#### `new bitball.BitSet(numberOfBits : Number = 8) -> bitball.BitSet`

Constructs a new `BitSet` object to hold your fancy bits. Allocates as few bytes as possible. `numberOfBits` defaults to `8` *bits*.

#### `bitball.BitSet.prototype.flip(bitIndex : Number, allowIndexOverflow : Boolean) -> undefined`

Flips the bit at `bitIndex`.

The `allowIndexOverflow` boolean allows you to control what happens if `bitIndex` is bigger than the number of bits you specified during construction.

- If `allowIndexOverflow` is `true`, then `.flip(...)` will fail silently.
- If `allowIndexOverflow` is `false`, then an exception will be thrown.

#### `bitball.BitSet.prototype.get(bitIndex : Number, dontThrow : Boolean) -> Boolean|null`

Gets the value of the bit at `bitIndex`.

The `dontThrow` boolean allows you to control what happens if `bitIndex` is bigger than the number of bits you specified during construction.

- If `dontThrow` is `true`, then `.get(...)` will return `null`.
- If `dontThrow` is `false`, then an exception will be thrown.

#### `bitball.BitSet.prototype.resize(numberOfBits : Number) -> undefined`

Resizes the `BitSet` as necessary to make sure it can hold `numberOfBits` *bits*.

#### `bitball.BitSet.prototype.set(bitIndex : Number, bitValue : Boolean, forceResize : Boolean) -> undefined`

Sets the value of the bit at `bitIndex` to `bitValue`.

The `forceResize` boolean allows you to control what happens if `bitIndex` is bigger than the number of bits you specified during construction.

- If `forceResize` is `true`, then `.set(...)` will call `.resize(bitIndex + 1)`.
- If `forceResize` is `false`, then an exception will be thrown.

#### `bitball.BitSet.prototype.length -> Number`

Returns the number of bits this `BitSet` object can hold (__i.e.__, *the biggest index* __+ 1__).

## Tests.

```sh
npm test
```

## Author.

[__Jonathan Barronville__](http://乔纳森.com "Jonathan Barronville") <[jonathan@belairlabs.com](mailto:jonathan@belairlabs.com)>

## License.

```
Copyright 2015 Jonathan Barronville <jonathan@belairlabs.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
