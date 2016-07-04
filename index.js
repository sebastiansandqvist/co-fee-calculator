// this simpler version should work, but isn't reliable due to v8 rounding bug
// var round = function(modifier, number, place) {
// 	var multiplier = Math.pow(10, place);
// 	return Math[modifier](number * multiplier) / multiplier;
// };

var round = function(modifier, number, place) {
	var exp = place > 0 ? 'e' : 'e-';
	var expNeg = place > 0 ? 'e-' : 'e';
	place = Math.abs(place);
	return Number(Math[modifier](number + exp + place) + expNeg + place);
}

/*
NOTE: All prices are in cents
 */

module.exports = {

	/**
	 * Collage increases price of item by whole dollar amounts
	 * @param  {Number} initialPrice in cents
	 * @return {Number}              in cents
	 */
	finalPrice: function(initialPrice) {
		return initialPrice + round('floor', initialPrice * 0.1 + 200, -2);
	},

	// Inverse of above function
	initialPrice: function(finalPrice) {
		return round('ceil', 10 * (finalPrice - 200) / 11, -2);
	},

	/**
	 * Percentage difference between finalPrice and initialPrice
	 * @param  {Number} initialPrice in cents
	 * @return {Number}              % change
	 */
	finalPriceMargin: function(initialPrice) {
		return round('round', (this.finalPrice(initialPrice) - initialPrice) * 100 / initialPrice, 0);
	},

	/**
	 * Merchant fees 2.9% + 30c
	 * @param  {Number} finalPrice in cents
	 * @return {Number}            in cents
	 */
	stripeFee: function(finalPrice) {
		return round('round', 0.029 * finalPrice + 30, 0);
	},

	/**
	 * What Collage earns by increasing price to buyers
	 * @param  {Number} initialPrice in cents
	 * @return {Number}              in cents
	 */
	marginRevenue: function(initialPrice) {
		return this.finalPrice(initialPrice) - initialPrice;
	},

	/**
	 * Total Collage earnings from sale after fees
	 * @param  {Number} initialPrice in cents
	 * @return {Number}              in cents
	 */
	collageRevenue: function(initialPrice) {
		return this.marginRevenue(initialPrice) - this.stripeFee(this.finalPrice(initialPrice));
	}

};