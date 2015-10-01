# co-fee-calculator
## Collage Fee Calculations

[![NPM version](https://img.shields.io/npm/v/@seabass/co-fee-calculator.svg)](https://www.npmjs.com/package/@seabass/co-fee-calculator) ![Dependencies](https://img.shields.io/david/sebastiansandqvist/co-fee-calculator.svg) [![build status](http://img.shields.io/travis/sebastiansandqvist/co-fee-calculator.svg)](https://travis-ci.org/sebastiansandqvist/co-fee-calculator) [![Test Coverage](https://codeclimate.com/github/sebastiansandqvist/co-fee-calculator/badges/coverage.svg)](https://codeclimate.com/github/sebastiansandqvist/co-fee-calculator/coverage)

## API
*(All values are in cents)*

#### `finalPrice(initialPrice)`
Returns the price of the item as it would appear in the marketplace (after 5% + $1 rounded increase)

#### `finalPriceMargin(initialPrice)`
Returns the percentage increase in the price of the item when running `finalPrice()`

#### `stripeFee(finalPrice)`
Returns merchant fee charged by Stripe, based on *`finalPrice`*

#### `sellerFee(initialPrice)`
Returns amount to be paid to Collage by seller on transaction

#### `sellerEarns(initialPrice)`
Returns amount to be paid to seller on transaction

#### `sellerEarnsPercentage(initialPrice)`
Returns percentage of sale price paid to seller

#### `sellerFeeRevenue(initialPrice)`
What collage earns from seller on transaction. (`sellerFee - stripeFee`)

#### `buyerFeeRevenue(initialPrice)`
What collage earns by increasing price via `finalPrice()`

#### `collageRevenue(initialPrice)`
Sum of `sellerFeeRevenue` and `buyerFeeRevenue`
