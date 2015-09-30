'use strict';

// var round = require('round-to');

/*
From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
 */
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
})();


/*
NOTE: All prices are in cents
 */

module.exports = {

	/**
	 * Collage increases price of item by whole dollar amounts
	 * @param  {Number} initialPrice in cents
	 * @return {Number}              in cents
	 */
	finalPrice(initialPrice) {
		return initialPrice + Math.floor10(initialPrice * 0.05 + 100, 2);
	},

	/**
	 * Percentage difference between finalPrice and initialPrice
	 * @param  {Number} initialPrice in cents
	 * @return {Number}              % change
	 */
	finalPriceMargin(initialPrice) {
		return Math.round10((this.finalPrice(initialPrice) - initialPrice) * 100 / initialPrice);
	},

	/**
	 * Merchant fees 2.9% + 30c
	 * @param  {Number} finalPrice in cents
	 * @return {Number}            in cents
	 */
	stripeFee(finalPrice) {
		return Math.round10(0.029 * finalPrice + 30);
	},

	/**
	 * Collage fees for sellers
	 * @param  {Number} finalPrice in cents
	 * @return {Number}            in cents
	 */
	sellerFee(finalPrice) {
		return Math.round10(0.05 * finalPrice + 100);
	},

	/**
	 * Collage seller earnings given initial price
	 * @param  {Number} initialPrice in cents
	 * @return {Number}              in cents
	 */
	sellerEarns(initialPrice) {
		return initialPrice - this.sellerFee(initialPrice);
	},

	/**
	 * What Collage earns from seller fees (is kind to sellers by not basing on finalPrice)
	 * @param  {Number} initialPrice in cents
	 * @return {Number}              in cents
	 */
	sellerFeeRevenue(initialPrice) {
		return this.sellerFee(initialPrice) - this.stripeFee(this.finalPrice(initialPrice));
	},

	/**
	 * What Collage earns by increasing price to buyers
	 * (Note: buyerFeeRevenue === buyerFee)
	 * @param  {Number} initialPrice in cents
	 * @return {Number}              in cents
	 */
	buyerFeeRevenue(initialPrice) {
		return this.finalPrice(initialPrice) - initialPrice;
	},

	/**
	 * Total Collage earnings from sale after fees
	 * @param  {Number} initialPrice in cents
	 * @return {Number}              in cents
	 */
	collageRevenue(initialPrice) {
		return this.sellerFeeRevenue(initialPrice) + this.buyerFeeRevenue(initialPrice);
	}

}