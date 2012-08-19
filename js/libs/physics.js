exports = {};

var GRAVITY_CONSTANT = 9.82;

var applyGravity = function(object, timestep) {
	object.velocity.y =
		GRAVITY_CONSTANT * timestep +
		object.velocity.y;

	return object;
}

exports.GRAVITY_CONSTANT = GRAVITY_CONSTANT;
exports.applyGravity = applyGravity;
