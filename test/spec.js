'use strict';

// ----- dependencies
// ---------------------------------------
const expect = require('chai').expect;
const calc = require('../');


// ----- tests
// ---------------------------------------
describe('Collage fee', function() {

	it('final price should be greater than initial price', function() {
		for (var i = 0; i <= 100000; i += 100) {
			expect(calc.finalPrice(i)).to.be.above(i);
		}
	});

	it('margin should be between 5% and 10% for items above $10', function() {
		for (var i = 1000; i <= 100000; i += 100) {
			expect(calc.finalPriceMargin(i)).to.be.within(5, 10);
		}
	});

	it('margin for low values $1: 100%, $2: 50%, $3: 33%, ...', function() {
		for (var i = 1; i < 20; i++) {
			let margin = calc.finalPriceMargin(i * 100);
			let answer = 100 / i;
			expect(margin).to.equal(Math.round(answer));
		}
	});

	it('seller earnings for should be positive for items above $5', function() {
		for (var i = 500; i <= 100000; i+= 100) {
			expect(calc.sellerEarns(i)).to.be.above(0);
		}
	});

	it('seller percentage of earnings should be above 75% for items above $10', function() {
		for (var i = 1000; i < 100000; i+= 100) {
			expect(calc.sellerEarnsPercentage(i)).to.be.at.least(75);
		}
	});

	it('seller percentage of earnings should increase (in general) with item price', function() {
		let previousValue = -Infinity;
		for (var i = 100; i < 2000; i+= 100) {
			expect(calc.sellerEarnsPercentage(i)).to.be.at.least(previousValue);
			previousValue = calc.sellerEarnsPercentage(i);
		}
		previousValue = -Infinity;
		for (var i = 0; i <= 100000; i+= 2000) {
			expect(calc.sellerEarnsPercentage(i)).to.be.at.least(previousValue);
			previousValue = calc.sellerEarnsPercentage(i);
		}
	});

	it('stripe fee should be less than seller fee', function() {
		for (var i = 100; i <= 100000; i += 100) {
			expect(calc.stripeFee(i)).to.be.below(calc.sellerFee(i));
		}
	});

	it('seller fee should be about the same as buyer fee', function() {
		for (var i = 0; i <= 100000; i += 100) {
			expect(calc.sellerFee(i)).to.be.closeTo(calc.buyerFeeRevenue(i), 100); // +- $1
		}
	});

	it('should be profitable', function() {
		for (var i = 0; i <= 100000; i += 100) {
			expect(calc.collageRevenue(i)).to.be.above(0);
		}
	});

});
