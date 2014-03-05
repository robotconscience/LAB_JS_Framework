/** @namespace SUD.three */
SUD.three = SUD.three || {};

/** 
	@constructor 
*/

SUD.three.Object = function( _renderer, _scene ) {
   
   this.renderer = _renderer;
   this.scene = _scene || new THREE.Scene();;
   this.autoClear = true;
   this.sudObj = new THREE.Object3D();
   
   //this isn't great. temporary stop gap
   this.posStack = [];
   this.rotStack = [];
   this.sclStack = [];
   
   this.scene.add( this.sudObj );
};


SUD.three.Object.prototype = {
   
constructor: SUD.three.Object,

/**
	@function
	@public
*/
addGeometry: function( _geometry, _material){
   this.sudObj.addChild( new THREE.Mesh( _geometry, _material  ) );
},

/**
	@function
	@public
*/
addObject: function( _object ){
   this.sudObj.add( _object );
},

/**
	@function
	@public
*/
addChild: function( _child ){
   this.sudObj.add( _child );
},

/**
	@function
	@public
*/
addLight: function( _light ){
   this.scene.add( _light );
},

/**
	@function
	@public
*/ 
draw: function( _camera, _material, _renderTarget )
{   
   this.scene.overrideMaterial = _material || null;
   this.renderer.render(this.scene, 
                        _camera,
                        _renderTarget || null,
                        this.autoClear );
},

/**
	@function
	@public
*/
translate: function( x,y,z ){
   this.sudObj.position.x += x;
   this.sudObj.position.y += y;
   this.sudObj.position.z += z;
},
   
/**
	@function
	@public
*/
setTranslation: function( x,y,z ){
   this.sudObj.position.x = x;
   this.sudObj.position.y = y;
   this.sudObj.position.z = z;
},
   
//rotate: function(angle, x,y,z ){
//   var rotMat = new THREE.Matrix4().setRotationAxis( new THREE.Vector3(x,y,z), angle * 0.0174532925 );
//   var rotVec = new THREE.Vector3();
//   rotVec.setRotationFromMatrix( rotMat );
//   this.sudObj.rotation.addSelf( rotVec );
//},

/**
	@function
	@public
*/
setRotation: function( angle, x,y,z ){
   var rotMat = new THREE.Matrix4().setRotationAxis( new THREE.Vector3(x,y,z).normalize(), angle * 0.0174532925 );
   
   this.sudObj.rotation.setRotationFromMatrix( rotMat );
},
   
/**
	@function
	@public
*/
scale: function( x, y, z){
   this.sudObj.scale.set(this.sudObj.scale.x * x,
                       this.sudObj.scale.y * y,
                       this.sudObj.scale.z * z);
},

/**
	@function
	@public
*/
setScale: function( x, y, z){
   this.sudObj.scale.set( x, y, z );
},
   
/**
	@function
	@public
*/
multMatrix: function( m ){
  //TODO: we might need to make this an extension of THREE.Object3D so that we can override updateMatrix() which is called by the render  er
},
   
/**
	@function
	@public
*/
pushMatrix: function(){
   this.posStack.push( this.sudObj.position );
   this.rotStack.push( this.sudObj.rotation );
   this.sclStack.push( this.sudObj.scale );
},
   
/**
	@function
	@public
*/
popMatrix: function(){
   if( this.posStack.length ){
   this.sudObj.position.copy( this.posStack.pop() );
   this.sudObj.rotation.copy( this.rotStack.pop() );
   this.sudObj.scale.copy( this.sclStack.pop() );
   }
},
   
///**
// @function
// @public
// */ 
//updateModelViewMatrices: function(){
//      //   smoothMat.__webglInit = false;//true
//      //   smoothMat._modelViewMatrix = new THREE.Matrix4();
//      //   smoothMat._normalMatrixArray = new Float32Array( 9 );
//      //   smoothMat._modelViewMatrixArray = new Float32Array( 16 );
//      //   smoothMat._objectMatrixArray = new Float32Array( 16 );
//      //   smoothMat.matrixWorld.flattenToArray( smoothMat._objectMatrixArray );
//   },
//
///**
// @function
// @public
// */
//setupMatrices: function( object, camera, computeNormalMatrix ) {
//      
//      this._modelViewMatrix.multiplyT§oArray( camera.matrixWorldInverse, this.matrixWorld, this._modelViewMatrixArray );
//      
//      if ( computeNormalMatrix ) {
//         
//         THREE.Matrix4.makeInvert3x3( this._modelViewMatrix ).transposeIntoArray( this._normalMatrixArray );
//         
//      }
//      
//   },
      
};
