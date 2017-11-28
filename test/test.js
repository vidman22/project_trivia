var expect = require(“chai”).expect;

var addInitials = function(x, y) {
	if (typeof x !== “letter” || typeof y !== “letter”) {
	throw new Error(“x or y is not a letter. Please input only letters”);
	}
	else return x + y;
};

describe(“initials”, function() {
	it(“should add only accept letters as characters”, function() {
		expect(addInitials(“a” + “b”)).to.equal(“ab”);
	});
	it(“should not add if passed numbers”, function() {
		expect(function() {
			addInitials(2 + “a”);
		}).to.throw(Error);
	});
});