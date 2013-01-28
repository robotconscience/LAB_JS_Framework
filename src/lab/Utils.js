/** @namespace LAB*/
LAB = LAB || {};

/********************************************
	MATH
********************************************/

/**
 @function
 */
LAB.random 			= function( _min, _max){
   return Math.random() * ( _max - _min ) + _min;
}
/**
 @function
 */
LAB.randomInt  		= function( _min, _max) {
   return Math.floor( LAB.random( _min, _max ));
}
/**
 @function
 */
LAB.randomObject  	= function( _array ){
   return _array[ Math.min(LAB.randomInt(0, _array.length ), _array.length-1)];
}
/**
 @function
 */
LAB.map				= function(value, _oldMin, _oldMax, _min, _max){    
   return _min + ((value-_oldMin)/(_oldMax-_oldMin)) * (_max-_min);
}
/**
 @function
 */
LAB.clamp 			= function( value, _min, _max ){
   return Math.min( Math.max( value, _min), _max );
}

/**
 @function
 */
LAB.degToRad		= function( deg ){
   return deg * 0.0174532925;
}
/**
 @function
 */
LAB.radToDeg		= function( rad ){
   return rad * 57.2957795;
}

/**
 * @returns The sign of this number, 0 if the number is 0.
 * example: aNumber.x.sign();
 */
Number.prototype.sign = function() {
  if(this > 0) {
    return 1;
  } else if (this < 0) {
    return -1;
  } else {
    return 0;
  }
}

/********************************************
	LOGGING
********************************************/
/**
 @function
 */
LAB.log				= function( text ) {
   if (window.console && window.console.log) {
      window.console.log( text );
   } else if (window.dump) {
      window.dump( text );
   }
}

/********************************************
	ANIMATION
********************************************/

	//http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	/** 
		@function 
		@public
	*/
	if ( !window.requestAnimationFrame ) {

		window.requestAnimationFrame = ( function() {

			return window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

				window.setTimeout( callback, 1000 / 60 );

			};

		} )();
	}
	
	// TO DO: window.cancelAnimationFrame

/********************************************
	BROWSER UTILS
********************************************/
	
	/**
	 * get string from url. e.g. www.lab.com/index.html?sandwich=turkey returns 'turkey'
	 * @param  {String} key      Query param (not including ? or &)
	 * @param  {String} default_ (Optional) what to return if param not found
	 * @return {String}          Returns value of key or default
	 */
	LAB.getQuerystring = function(key, default_)
	{
		if (default_==null) default_=""; 
		key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
		var qs = regex.exec(window.location.href);
		if(qs == null)
			return default_;
		else
			return qs[1];
	}

/********************************************
	GENERIC UTILS
********************************************/

	LAB.alphabet = LAB.alphabet || ['#','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];	

/********************************************
	COMPATIBILITY
********************************************/

	// add bind method for browsers that don't currently support it (such as Safari)
	if (!Function.prototype.bind) {  
	  Function.prototype.bind = function (oThis) {  
		if (typeof this !== "function") {  
		  // closest thing possible to the ECMAScript 5 internal IsCallable function  
		  throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");  
		}  
	  
		var aArgs = Array.prototype.slice.call(arguments, 1),   
			fToBind = this,   
			fNOP = function () {},  
			fBound = function () {  
			  return fToBind.apply(this instanceof fNOP  
									 ? this  
									 : oThis || window,  
								   aArgs.concat(Array.prototype.slice.call(arguments)));  
			};  
	  
		fNOP.prototype = this.prototype;  
		fBound.prototype = new fNOP();  
	  
		return fBound;  
	  };  
	} 


/********************************************
	NAMESPACE
********************************************/
/**
 * Use this function to safely create a new namespace
 * if a namespace already exists, it won't be recreated.
 *
 * @function
 * @param {String} nsString The namespace as a string.
 * @return {Object} The namespace object.
 */
window.namespace = function (namespaceString) {
	var parts = namespaceString.split('.'),
		parent = window,
		i;

	for (i=0; i<parts.length; i +=1) {
		// create a property if it doesn't exist
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
};	
