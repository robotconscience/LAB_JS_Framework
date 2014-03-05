	// include required files
/** @namespace SUD*/
var SUD = SUD || {};

// reference to global context, in most cases 'window'.
SUD.global = this;

// version
SUD.version = "r2";

// require based on: http://closure-library.googlecode.com/svn/trunk/closure/goog/base.js

/*
 * helper (for javascript importing within javascript).
 */

var included = {};

/**
 * Copied from Flanagan, David. Javascript: The Definitive Guide.
 * Use this function to inherit objects.
 *
 * @function
 * @example
 * Child.prototype = SUD.inherit(Parent.prototype);
 * Child.prototype.constructor = Child;
 *
 * @param {Object} p The Parent object to inherit. The object can either be the prototype of the Parent
 * object (Parent.prototype) or a new instance of the parent (new Parent())
 * @return {Object} A copy of the prototype of the Parent object.
 */
SUD.inherit = function(p) {
	if (p == null) return; // p must be a non-null object
	if (Object.create) { // If Object.create() is defined...
		return Object.create(p); // then just use it
	}
	var t = typeof p; // otherwise do some more type checking
	if (t !== "object" && t !== "function") throw TypeError();
	function f() {}; // define a dummy constructor function
	f.prototype = p; // Set its prototype property to p
	return new f(); // use f() to create an 'heir' of p.
};

// alternate version of inherit:
///**
// * Copied from Stefanov, Stoyan. JavaScript Patterns.
// * Use this function to inherit objects
// *
// * @function
// * @example
// * SUD.inherit(Child, Parent);
// *
// * @param {Object} C The Child object.
// * @param {Object} P The Parent object.
// */
//SUD.utils.inherit = function(C, P) {
//	var F = function() {};
//	F.prototype = P.prototype;
//	C.prototype = new F();
//	C.uber = P.prototype;
//	C.prototype.constructor = C;
//}



/**
@function
@private
*/
SUD.writeScriptTag_ = function(src) {
	var doc = SUD.global.document;
	doc.write(
		'<script type="text/javascript" src="' + src + '"></' + 'script>');
	included[src] = true;
	return true;
};

/**
	Use this to load script files! (only script files right now)
	@function
	@public
*/
SUD.require = function(src) {
	src in included ? console.log("already included") : SUD.writeScriptTag_(src);
};

SUD.getScriptPath = function(filename) {
	var scripts = document.getElementsByTagName('script');

    for (var i = scripts.length - 1; i >= 0; --i) {
		var src = scripts[i].src;
		var l = src.length;
		var length = filename.length;
		if (src.substr(l - length) == filename) {
        	// set a global propery here
        	return src.substr(0, l - length);
		}
    }
	return "";
};

SUD.toScriptPath = function( className ){
	return SUD.src+className+".js";
};

SUD.src= SUD.getScriptPath("sudBase.js");

// start including stuff
SUD.require( SUD.src+"EventDispatcher.js" );
SUD.require( SUD.src+"app/BaseApp.js" );
SUD.require( SUD.src+"Utils.js" );

// key constants
SUD.SHIFT 	= 16;
SUD.CONTROL = 17;
SUD.ALT		= 18;
SUD.COMMAND = 91;