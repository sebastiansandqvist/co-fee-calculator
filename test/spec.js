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

	it('initial price should be calculated from final price', function() {
		for (var i = 0; i <= 100000; i += 100) {
			expect(calc.initialPrice(calc.finalPrice(i))).to.equal(i);
		}
	});

	it('margin should be between 10% and 30% for items over $10', function() {
		for (var i = 1000; i <= 100000; i += 100) {
			expect(calc.finalPriceMargin(i)).to.be.within(10, 30);
		}
	});

	it('stripe fee should be less than collage revenue', function() {
		for (var i = 100; i <= 100000; i += 100) {
			expect(calc.stripeFee(i)).to.be.below(calc.collageRevenue(i));
		}
	});

	it('revenue from margins should always be at least $2', function() {
		for (var i = 0; i <= 100000; i += 100) {
			expect(calc.marginRevenue(i)).to.be.at.least(200);
		}
	});

	it('should be profitable', function() {
		for (var i = 0; i <= 100000; i += 100) {
			expect(calc.collageRevenue(i)).to.be.above(0);
		}
	});

});
