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

let assert

assert = (condition, message) => {
  if (! condition) {
    throw new Error('Assertion failed!')
  }
}

export class BitSet {
  constructor(numberOfBits = 8) {
    this._bits = new Uint8Array(
      BitSet.numberOfBytesNeeded(numberOfBits))
    this._numberOfBits = numberOfBits
  }

  _calculateBucketIndex(bitIndex) {
    return (BitSet.numberOfBytesNeeded(bitIndex + 1) - 1)
  }

  flip(bitIndex, allowIndexOverflow) {
    switch (this.get(bitIndex, allowIndexOverflow)) {
    case null:
      // Fail silently.
      return
    case true:
      this.set(bitIndex, false, allowIndexOverflow)
    case false:
      this.set(bitIndex, true, allowIndexOverflow)
    default:
      assert(false) // This block should never be reached!
    }
  }

  get(bitIndex, dontThrow) {
    let bucketIndex
    let invalidBitIndexError

    invalidBitIndexError = new Error(`The bit index provided (${bitIndex}) is invalid!`)

    if (bitIndex < 0) {
      throw invalidBitIndexError
    }

    if (this._numberOfBits < (bitIndex + 1)) {
      if (dontThrow === true) {
        return null
      } else {
        throw invalidBitIndexError
      }
    }

    bucketIndex = this._calculateBucketIndex(bitIndex)

    switch ((this._bits[bucketIndex] >> ((bitIndex - ((bucketIndex * 8) - 1)) - 1)) & 0b00000001) {
    case 0:
      return false
    case 1:
      return true
    default:
      assert(false) // This block should never be reached!
    }
  }

  resize(numberOfBits) {
    let bits
    let currentNumberOfBytes
    let numberOfBytesNeeded

    currentNumberOfBytes = BitSet.numberOfBytesNeeded(this._numberOfBits)
    numberOfBytesNeeded = BitSet.numberOfBytesNeeded(numberOfBits)

    // We may already have enough bytes to hold the new amount of bits.
    if (currentNumberOfBytes === numberOfBytesNeeded) {
      this._numberOfBits = numberOfBits

      return
    }

    bits = new Uint8Array(numberOfBytesNeeded)

    if (currentNumberOfBytes > numberOfBytesNeeded) {
      let maxBucketIndexNeeded

      maxBucketIndexNeeded = numberOfBytesNeeded - 1

      this._bits.forEach((bucket, bucketIndex) => {
        if (bucketIndex <= maxBucketIndexNeeded) {
          bits[bucketIndex] = bucket
        }
      })
    } else {
      this._bits.forEach((bucket, bucketIndex) => {
        bits[bucketIndex] = bucket
      })
    }

    this._bits = bits
    this._numberOfBits = numberOfBits
  }

  set(bitIndex, bitValue, forceResize) {
    let bucketIndex
    let invalidBitIndexError

    invalidBitIndexError = new Error(`The bit index provided (${bitIndex}) is invalid!`)

    if (bitIndex < 0) {
      throw invalidBitIndexError
    }

    if (this._numberOfBits < (bitIndex + 1)) {
      if (forceResize === true) {
        this.resize(bitIndex + 1)
      } else {
        throw invalidBitIndexError
      }
    }

    bucketIndex = this._calculateBucketIndex(bitIndex)

    switch (!! bitValue) {
    case true:
      this._bits[bucketIndex] |= 0b00000001 << ((bitIndex - ((bucketIndex * 8) - 1)) - 1)

      return
    case false:
      this._bits[bucketIndex] &= ~(0b00000001 << ((bitIndex - ((bucketIndex * 8) - 1)) - 1))

      return
    default:
      assert(false) // This block should never be reached!
    }
  }

  get length() {
    return this._numberOfBits
  }

  static numberOfBytesNeeded(numberOfBits) {
    let bitsToByteRemainder

    bitsToByteRemainder = numberOfBits % 8

    if (bitsToByteRemainder === 0) {
      return (numberOfBits / 8)
    } else {
      return (((numberOfBits + 8) - bitsToByteRemainder) / 8)
    }
  }
}

export default {BitSet}
