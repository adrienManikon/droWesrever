# 0.1.0 / 2012-08-25
* Added new `eg` operator for the egal comparison (using Object.is(x, y))

# 0.0.9 / 2012-08-19
* Description section now 63 chars
* \__private\__.stop -> this.__log__.stop
* README: License
* README: call/apply/bind fixed example
* README: Installation (Downloading, including, Using)
* New instance system
* The modules are supported via constructor
* <name> - the module name
* <config> now is a static function
* <exec>: !== -> !=
* Global refactoring

# 0.0.8 / 2012-08-18
* `[critical]` Fixed bug with object instantion
* \__private\__.timeout -> \__config\__.timeout
* Added __private.log.info
* Refactoring

# 0.0.7 / 2012-08-17
* Added \__private\__.extend()
* `[critical]` Fixed bug with Expected and Actual params in the <done>
* `[critical]` Fixed tests

# 0.0.6 / 2012-08-16
* Added Suitest.config
* Added <finish>
* More documentation
* <text> replaced with <describe>

# 0.0.5 / 2012-08-15
* Added safe conditions for console object and setTimeout
* `[critical]` Fixed bug with global object in strict mode (Node.js worked fine o_O)
* `[critical]` Fixed unicode escapes bug for host engines

# 0.0.4 / 2012-08-14
* More documentation
* Refactoring

# 0.0.3 / 2012-08-13

* setTimeout fix;
* done ( [ callback, [, context] ] );
* Getting total elapsed time
* Added \__private\__.time

# 0.0.2 / 2012-08-13

* Added timer for <test> (fix for queue calls)
* HISTORY.md:
* README.md: added image
* npm support: package.json
* Server-side support (NodeJS: module.exports)
* README.md: added image
* Colored text in console
* New method .get() for outline function callbacks

# 0.0.1 / 2012-08-12

* Support for working with asynchronous code
* Fluent interface support (chaining)
* .test( name, callback, [, context ] );
* .exec( x, [, y, context ] );
* .done( [ name ] );
* .text( description );
* .stop();
* .is();
