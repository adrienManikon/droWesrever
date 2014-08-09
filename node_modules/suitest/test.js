var Suitest = require('./suitest.js');

/*
  The first module
*/

var unit_1 = new Suitest('Module 1');

// test 1
unit_1.test('test 1', function(unit) {
	unit.describe('Test description 1!').exec(true, 1).done(); // true
});

// test 2
unit_1.test('test 2', function(unit) {
	unit.describe('Test description 2!');

	if(unit.exec(typeof null !== 'object').is()) // true
		unit.stop();

	unit.done();
});


/*
 The second module
*/

var unit_2 = new Suitest('Module 2');

// test 1
unit_2.test('test 1', function(unit)
{
	setTimeout(function() {
		unit.exec(Math.acos(-1), Math.PI).done(); // true
	}, 500);
});

// test 2
unit_2.test('test 2', function(unit)
{
	setTimeout(function() {
		unit.exec([], Array); // false
		unit.done();
	}, 1000);
});

// test 3
unit_2.test('test 3', function(unit)
{
	setTimeout(function() {
		unit.exec(1.1 | 0, 1); // true
		unit.done();
	}, 1000);
});


var set = function() {
	return unit_2
		.get('test 4')
		.exec(true, 1)
		.done();
};

// test 4
unit_2.test('test 4', function(unit) {
	set(); // true
});
