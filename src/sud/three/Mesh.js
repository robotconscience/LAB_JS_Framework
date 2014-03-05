/** @namespace SUD.three */
SUD.three = SUD.three || {};

/** 
 @constructor 
 @extends THREE.Mesh
 */

SUD.three.Mesh = function () {
  THREE.Mesh.call( this );
  
    //   this.material = null;
  this.loader = null;// new THREE.JSONLoader( true );
  this.isLoaded = false;
  this.location = "";
};

SUD.three.Mesh.prototype = new THREE.Mesh();
SUD.three.Mesh.prototype.constructor = SUD.three.Mesh;
SUD.three.Mesh.prototype.supr = THREE.Mesh.prototype;

/**
 @function
 @public
 */

SUD.three.Mesh.prototype.loadGeometry = function( location, onload ){
  var self = this;
  this.loader = new THREE.JSONLoader( true );
  this.loader.onLoadComplete = onload || function(){};
  this.loader.load( this.location, function( geometry ){self.geometry = geometry;} );
}

SUD.three.Mesh.prototype.load = function( location, shader, scene ){
   this.scene = scene || console.warn("please pass in a THREE.Scene object");
   if (!scene){
      this.scene = new THREE.Scene();
   }
   this.material = shader || new THREE.NormalMaterial();
   this.location = location;
   
   this.loadGeometry( this.location, this._onload.bind(this) );
}

SUD.three.Mesh.prototype._onload = function(){
  //      self.mesh = new THREE.Mesh( self.geometry, self.shader);
  
  this.geometry.computeBoundingSphere();
  this.boundRadius = this.geometry.boundingSphere.radius;
  this.scene.add( this );
  
  console.log( this.location," loaded" );
}

