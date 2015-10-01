'use strict';

const round = require('round-to');

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
		return initialPrice + round.down(initialPrice * 0.05 + 100, -2);
	},

	/**
	 * Percentage difference between finalPrice and initialPrice
	 * @param  {Number} initialPrice in cents
	 * @return {Number}              % change
	 */
	finalPriceMargin(initialPrice) {
		return round((this.finalPrice(initialPrice) - initialPrice) * 100 / initialPrice, 0);
	},

	/**
	 * Merchant fees 2.9% + 30c
	 * @param  {Number} finalPrice in cents
	 * @return {Number}            in cents
	 */
	stripeFee(finalPrice) {
		return round(0.029 * finalPrice + 30, 0);
	},

	/**
	 * Collage fees for sellers
	 * @param  {Number} initialPrice in cents
	 * @return {Number}            in cents
	 */
	sellerFee(initialPrice) {
		return round(0.05 * initialPrice + 100, 0);

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
	 * Percent of final sale price that goes to the seller
	 * @param  {Number} i initialPrice in cents
	 * @return {Number}   %
	 */
	sellerEarnsPercentage(i) {
		return round((i - this.sellerFee(i)) * 100 / this.finalPrice(i), 0);
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

};