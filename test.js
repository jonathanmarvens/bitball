/**
 ****************************************************************************
 * Copyright 2015 Jonathan Barronville <jonathan@belairlabs.com>            *
 *                                                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 *     http://www.apache.org/licenses/LICENSE-2.0                           *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 ****************************************************************************
 */

import 'source-map-support/register'
import {BitSet} from '.'
import test from 'tape'

test('`new bitball.BitSet()`', (t) => {
  t.test('holds 8 bits by default', (st) => {
    let b

    b = new BitSet()

    st.equal(b.length, 8)

    st.end(null)
  })

  t.test('holds the requested amount of bits', (st) => {
    const numberOfBits = 21
    let b

    b = new BitSet(numberOfBits)

    st.equal(b.length, numberOfBits)

    st.end(null)
  })
})

test('`bitball.BitSet.prototype.set(...)`', (t) => {
  t.test('sets the bits as requested', (st) => {
    let b
    let i00

    b = new BitSet(21)

    b.set(3, true)
    b.set(9, true)
    b.set(17, true)

    for (i00 = 0; i00 < 21; i00++) {
      let bitValue

      bitValue = b.get(i00)

      switch (i00) {
      case 3:
      case 9:
      case 17:
        st.equal(bitValue, true)

        break
      default:
        st.equal(bitValue, false)
      }
    }

    st.end(null)
  })

  t.test('when `bitIndex` is too big, resizes when `forceResize === true`', (st) => {
    let b
    let bitValue

    b = new BitSet(21)

    st.equal(b.length, 21)

    b.set(32, true, true)

    bitValue = b.get(32)

    st.equal(b.length, 33)
    st.notEqual(bitValue, null)
    st.equal(bitValue, true)

    st.end(null)
  })

  t.test('when `bitIndex` is too big, throws when `forceResize !== true`', (st) => {
    let b
    let bitValue

    b = new BitSet(21)

    st.equal(b.length, 21)

    st.throws(() => {
      b.set(32, true)
    })

    st.equal(b.length, 21)

    st.end(null)
  })
})

test('`bitball.BitSet.prototype.get(...)`', (t) => {
  t.test('gets the bits as requested', (st) => {
    let b
    let i00

    b = new BitSet(21)

    b.set(3, true)
    b.set(9, true)
    b.set(17, true)

    for (i00 = 0; i00 < 21; i00++) {
      let bitValue

      bitValue = b.get(i00)

      switch (i00) {
      case 3:
      case 9:
      case 17:
        st.equal(bitValue, true)

        break
      default:
        st.equal(bitValue, false)
      }
    }

    st.end(null)
  })

  t.test('when `bitIndex` is too big, returns `null` when `dontThrow === true`', (st) => {
    let b
    let bitValue

    b = new BitSet(21)

    st.equal(b.length, 21)

    bitValue = b.get(32, true)

    st.equal(b.length, 21)
    st.equal(bitValue, null)

    st.end(null)
  })

  t.test('when `bitIndex` is too big, throws when `dontThrow !== true`', (st) => {
    let b
    let bitValue

    b = new BitSet(21)

    st.equal(b.length, 21)

    st.throws(() => {
      b.get(32)
    })

    st.equal(b.length, 21)

    st.end(null)
  })
})

test('`bitball.BitSet.prototype.resize(...)` resizes the bitset as it should.', (t) => {
  let b

  b = new BitSet(21)

  b.resize(79)

  t.equal(b.length, 79)

  b.resize(55)

  t.equal(b.length, 55)

  t.end(null)
})
