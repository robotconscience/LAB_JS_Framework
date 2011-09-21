/**********
 *  MATH  *
 **********/
function labRandom( _min, _max){
   return Math.random() * ( _max - _min ) + _min;
}

function labRandomInt( _min, _max) {
   return Math.floor( labRandom( _min, _max ));
}

function labRandomObject( _array ){
   return _array[ Math.min(labRandomInt(0, _array.length ), _array.length-1)];
}

function labMap(value, _oldMin, _oldMax, _min, _max){    
   return _min + ((value-_oldMin)/(_oldMax-_oldMin)) * (_max-_min);
}

function labDegToRad( deg ){
   return deg * 0.0174532925;
}

function labRadToDeg( rad ){
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

/***********
*** MISC ***
************/
function labLog( text ) {
   if (window.console && window.console.log) {
      window.console.log( text );
   } else if (window.dump) {
      window.dump( text );
   }
}