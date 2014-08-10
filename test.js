var suitest = require('suitest');
var app = require('./app.js');

var unit_1 = new suitest('Module 1');
// test 1
unit_1.test('test 1', function(unit)
{
    unit.describe('Test description 1!')
    .exec(true, 1).done(); // true
});
