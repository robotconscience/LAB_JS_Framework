// load graphics base, because this is a graphics app
LAB.require(LAB.src+"app/ThreeApp.js");

var demoApp;

$(document).ready( function() {
	DemoApp.prototype = $.extend(true, LAB.app.ThreeApp.prototype, DemoApp.prototype);
	demoApp = new DemoApp();
	demoApp.begin();
});

// ===========================================
// ===== DEMO APP
// ===========================================
DemoApp = function() {
	LAB.app.ThreeApp.call( this );		
   
	var _self = this;
   
	var lastMouse = {x:0, y:0};
	var camera;
   var projector;
   
   var ambientLight;
   var pointLight;
   var mesh;

   var geoms = [];
   var pointer;
	// ===========================================
	// ===== SETUP
	// ===========================================	
	this.setup = function() {
		// catch mouse events!
		this.registerMouseEvents();

		//cameras
        camera = new LAB.three.Camera( 35, window.innerWidth / window.innerHeight, .1, 1000 );
        camera.setToWindowPerspective();

		ambientLight = new THREE.AmbientLight( 0x222222 );
      this.scene.addLight( ambientLight );
      
      pointLight = new THREE.PointLight();// { color: 0xffffff} );
      pointLight.position.copy( camera.position );
      this.scene.addLight( pointLight );
      
      var geometry = new THREE.SphereGeometry( 10, 20 ,20);
      mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: true } ));//new THREE.MeshNormalMaterial() );
      mesh.position.set( window.innerWidth/2, window.innerHeight/2, 0);
      mesh.scale.set( 30, 30, 30 );
      this.scene.addObject( mesh );
      
      projector = new THREE.Projector();
      
      geoms.push( mesh );
      THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshColliderWBox  ( mesh, mesh.position ) );
      
      var pointerPoints = [];
      pointerPoints.push( new THREE.Vector3( 0, 0, 0 ) );
      pointerPoints.push( new THREE.Vector3( 0, 2, 3 ) );
      pointerPoints.push( new THREE.Vector3( 0, 1, 3 ) );
      pointerPoints.push( new THREE.Vector3( 0, 1, 10 ) );
      pointerPoints.push( new THREE.Vector3( 0, 0, 10 ) );
      
      var pointerGeom = new THREE.LatheGeometry( pointerPoints );
      pointer = new THREE.Mesh( pointerGeom, new THREE.MeshNormalMaterial( ) );
      pointer.scale.set( 10, 10, 10 );
      this.scene.addObject( pointer );
      
	}
	
	// ===========================================
	// ===== UPDATE
	// ===========================================
	this.update = function() {
      var vector = new THREE.Vector3( 2 * (lastMouse.x/window.innerWidth - .5), 
                                      2 * (lastMouse.y/window.innerHeight - .5),
                                     0.5 );
      projector.unprojectVector( vector, camera );
      
      pointer.position.set( lastMouse.x, window.innerHeight - lastMouse.y, 0 );
      pointer.rotation.set( LAB.degToRad( lastMouse.x), LAB.degToRad( lastMouse.y ), 0 );
		
      var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
      
      var c = THREE.Collisions.rayCastNearest( ray );
      
      if ( c ) {
         
         LAB.log( ray );
         LAB.log( c );
         LAB.log( camera.position );
         pointer.position.copy( ray.origin );
         
         gl.clearColor( .4, .4, 4.6, 1);
         
      }else{
         gl.clearColor( .2, .2, .3, 1);
      }
	}
	
	// ===========================================
	// ===== DRAW
	// ===========================================
	this.draw = function() {
      gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
      
		this.renderer.render( this.scene, camera );
	}
	
	// ===========================================
	// ===== RESIZE
	// ===========================================
	this.onWindowResized = function( width, height ) {

	}
   
	// ===========================================
	// ===== MOUSE
	// ===========================================
	this.onMouseMoved = function( x, y ) {
		lastMouse.x = x;
		lastMouse.y = y;
	}
	
	this.onMousePressed	= function( x, y ) {
	}
}

	/*
	DemoApp.prototype 				= new LAB.ThreeApp();
	DemoApp.prototype.constructor 	= DemoApp;
	DemoApp.prototype.supr 			= LAB.ThreeApp.prototype;	
	*/