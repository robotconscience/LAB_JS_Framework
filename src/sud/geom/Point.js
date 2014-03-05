// include required files
/** @namespace SUD.geom*/
SUD.geom = SUD.geom || {};

/** 
 @constructor 
**/
SUD.geom.Point = function( x, y, z){
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
};