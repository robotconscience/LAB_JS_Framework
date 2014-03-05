var demoApp;

$(window).bind("load", function() {
   DemoApp.prototype = $.extend(true, SUD.app.ThreeApp.prototype, DemoApp.prototype);
   demoApp = new DemoApp();
   demoApp.begin();
});

// ===========================================
// ===== DEMO APP
// ===========================================

DemoApp = function() {
	SUD.app.ThreeApp.call( this );		
   
   var bStats =  true;
   var camera;
   var part;

   var start  = Date.now();
   
   // ===========================================
	// ===== SETUP
	// ===========================================	
	this.setup = function() {
      // customize the built-in camera
      this.camera.position.z = 200;

      attributes = {
         duration: {  type: 'f', value: [] },
      };

      uniforms = {
         time: { type: "f", value: 0.0 },
         texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "img/ball.png" ) },
         color:     { type: "c", value: new THREE.Color( 0xff0000 ) }
      };

      uniforms.texture.value.wrapS = uniforms.texture.value.wrapT = THREE.RepeatWrapping;

      var shaderMaterial = new THREE.ShaderMaterial( {

         uniforms:      uniforms,
         attributes:     attributes,
         vertexShader:   document.getElementById( 'vertexShader' ).textContent,
         fragmentShader: document.getElementById( 'fragmentShader' ).textContent

      });

      var values_duration = attributes.duration.value;

      for ( var i=0; i<4; i++){
         values_duration[i] = 10000 + 500 * i;
      }

      part = new THREE.Mesh( new THREE.PlaneGeometry( 100, 200), shaderMaterial );//new THREE.MeshBasicMaterial( {color:0xff0000, map: THREE.ImageUtils.loadTexture( "img/ball.png" )}) );
      this.scene.add(part);
	}
   
	// ===========================================
	// ===== UPDATE
	// ===========================================
	this.update = function() {
      //uniforms.time.value = Date.now() - start;
	}  
   
	
	// ===========================================
	// ===== DRAW
	// ===========================================
	this.draw = function() {
      // you must call this in draw!
      this.renderer.render( this.scene, this.camera, null, true );
	}   
   
	// ===========================================
	// ===== KEYS
	// ===========================================
   
   
   this.onDocumentKeyDown = function( event ){
//      console.log( event.keyCode );
      switch( event.keyCode ) {
         case 32:
            bStats = !bStats;
            stats.domElement.hidden = !bStats;
            break;
      }
   }
}
