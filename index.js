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
		return initialPrice + round.down(initialPrice * 0.1 + 200, -2);
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
	 * What Collage earns by increasing price to buyers
	 * @param  {Number} initialPrice in cents
	 * @return {Number}              in cents
	 */
	marginRevenue(initialPrice) {
		return this.finalPrice(initialPrice) - initialPrice;
	},

	/**
	 * Total Collage earnings from sale after fees
	 * @param  {Number} initialPrice in cents
	 * @return {Number}              in cents
	 */
	collageRevenue(initialPrice) {
		return this.marginRevenue(initialPrice) - this.stripeFee(this.finalPrice(initialPrice));
	}

};