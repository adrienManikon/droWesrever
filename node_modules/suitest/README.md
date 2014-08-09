# Suitest

Suitest is a powerful and easy-to-use JavaScript BDD test suite

* Very simple to use
* Minimum functions and maximum capacity
* Client-side and server-side (including Node.js) support
* One of the most lightweightest libraries for unit testing
* Support for working with asynchronous code
* Outline function callbacks!
* Modular system
* Fluent interface support (chaining)


####BDD practices:

Behavior-driven development (or BDD) is an agile software development technique devised by Dan North as a response to the issues encountered teaching test-driven development.

*The practices of BDD include:*

* Establishing the goals of different stakeholders required for a vision to be implemented
* Drawing out features which will achieve those goals using feature injection
* Involving stakeholders in the implementation process through outside–in software development
* Using examples to describe the behavior of the application, or of units of code
* Automating those examples to provide quick feedback and regression testing
* Using 'should' when describing the behavior of software to help clarify responsibility and allow the software's functionality to be questioned
* Using 'ensure' when describing responsibilities of software to differentiate outcomes in the scope of the code in question from side-effects of other elements of code.
* Using mocks to stand-in for collaborating modules of code which have not yet been written


##Synopsis


*Add a test to run*

```javascript
.test ( name, callback, [, context ] );
```
<br />
*A comparison assertion*

```javascript
.exec ( x, [, y, operator ] );
```
<br />
*Register a callback to fix test result*

```javascript
.done ( [ callback, context] );
```
<br />
*Add test description*

```javascript
.describe ( description );
```
<br />
*Register outline function callbacks*

```javascript
.get ( name );
```
<br />
*Throws an exception when test run and stop all next tests*

```javascript
.stop ();
```
<br />
*A boolean assertion*

```javascript
.is ();
```
<br />
*Register a final callback whenever all the tests have finished running*

```javascript
.finish ( [callback, [total, filed, passed, time] );
```

## Installation

#### Downloading

Choose one of the ways to download the Suitest:

*npm*

```
sudo npm install -g suitest
```

*git*

```
git clone git://github.com/monolithed/Suitest.git
```

*zip/gzip*

```
https://github.com/monolithed/Suitest/downloads
```

#### Server-side including

```javascript
var Suitest = require('./suitest.js');
```

#### Client-side including

```html
<script src="./suitest.js" type="text/javascript"></script>
```

#### Using

```javascript
var unit = new Suitest('Module name');
```

## Screenshot

![Suitest](http://habrastorage.org/storage2/36a/e9f/7b7/36ae9f7b7c575ebbde1323071a1d4216.png "Suitest")

## API


### .test ( name, callback, [, context ] );

```javascript
var unit = new Suitest;

unit.test('test name', function(unit) {typ
	unit.exec(true, 1); // true
	unit.done();
});
```

### .exec ( x, [, y, context ] );

*Using with one parameter:*

```javascript
unit.exec(true); // true
```

*Using with two parameter:*

```javascript
unit.exec(true, 1); // true, because default operation is ==
```

*Using with three parameters:*

```javascript
unit.exec(true, 1, '==='); // false, because true and 1 are not equivalent
```

### .done ( [ callback ] );

*Simple using:*

```javascript
unit.done();
```

*Testing asynchronous code:*

```javascript
unit.test('test name', function(unit) {
	setTimeout(function() {
		unit.exec(true, 1); // true
		unit.done();
	}, 2000);
});
```

### .describe ( description );

```javascript
unit.describe('Test description');
```

### .finish ( [callback, [total, filed, passed, time] );

```javascript
unit.test('test 1', function() {
    this.exec(true).done();
});

unit.test('test 2', function(unit) {
   this.exec(true).done();
});

unit.finish(function(data) {
    console.log('Total:', total, 'Filed: ', filed, 'Passed: ', passed, 'Time: ', time);
});

// Total: 6, Filed: 2, Passed: 4, Time: 1.00
```

### .stop ();

```javascript
unit.stop();
```

### .is ()

```javascript
unit.exec(true, 1);
unit.is(); // true
```

### .get ( name );

*Outline function callback*

```javascript
var set = function() {
	return unit
		.get('test 6')
		.exec(true, 1)
		.done();
};
```

*Simple using*

```javascript
unit.test('test', function(unit) {
	set(); // true
});
```

*Using with asynchronous code*

```javascript
unit.test('test', function(unit) {
	setTimeout(set, 2000); // true
});
```

*Function.prototype.bind / Function.prototype.call* <br />
Also you can use it without \<get\> method (but this not recommended):

```javascript
var set = function() {
	return this
		.exec(true, 1)
		.done();
};

unit.test('test', function(unit) {
	set.call(unit); // true
});
```

### Context

*There're several ways to set the calling context* <br />

*this*

```javascript
unit.test('test', function() {
	this.exec(true).done();
});
```

*parameter*

```javascript
unit.test('test', function(context) {
	context.exec(true).done();
});
```

*.get()*

```javascript
var set = function() {
	return unit.get('test').exec(true).done();
};

unit.test('test', set);
```

*.call/apply/bind()*

```javascript
var set = function() {
	return this.exec(true).done();
};

unit.test('test', function() {
	set.call(this);
});
```


### Chaining (Fluent interface)


```javascript
var unit = new Suitest;

unit
.test('test 1', function(unit) {
	unit.exec(true, 1).done();
})

.test('test 2', function(unit) {
	unit.describe('test description').exec(true, 1).done();
})

.test('test 2', function(unit) {
	if (!unit.exec(true, 1).is())
		unit.stop();
});
```


### Operators

*`==` operator is used by default and for most operations, you can miss it:*

```javascript
unit.exec(true, 1);
```

*You can also specify it explicitly:*

```javascript
unit.exec(true, 1, '==');
```

*Other available operators:*
<br />
`===`, `!==`, `!==`, `!=`, `<`, `>`, `<=`, `>=`, `eq` <br />

*Special `eg` operator for egal comparison.
The internal comparison abstract operation SameValue(x, y), where x and y are ECMAScript language values, produces true or false (ECMAScript 5 9.12).*
<br />


```javascript
unit.exec(NaN, NaN, 'eq'); // true
unit.exec(0,   0, 'eq');   // false
unit.exec(-0, +0, 'eq');   // false
unit.exec('0', 0, 'eq');   // false
```


## License

* Suitest is licensed under the MIT (MIT_LICENSE.txt) license

* Copyright (c) 2012 [Alexander Guinness] (https://github.com/monolithed)