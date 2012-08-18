var buster = require('buster');
var gameObject = require('../js/game_object.js');
var util = require('util');

buster.testCase("GameObject", {
	"Basic operations": function() {
		var obj = new gameObject.GameObject(10, 0, 0);
		assert.equals(obj.getPosition().x, 10);
	}
});
