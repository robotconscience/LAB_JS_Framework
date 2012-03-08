// include LabBase files
/** @namespace LAB.app */
LAB.require(LAB.src+"../../libs/three/Three.js");
LAB.require(LAB.src+"app/BaseApp.js");

// LAB Three includes

LAB.require(LAB.src+"three/Camera.js");
LAB.require(LAB.src+"three/Geometry.js");
LAB.require(LAB.src+"three/Mesh.js");
LAB.require(LAB.src+"three/Object.js");
LAB.require(LAB.src+"three/ParticleEmitter.js");
LAB.require(LAB.src+"three/Shader.js");

/**
* global gl reference to mirror normal openGL
* @type WebGLContext
*/
var gl = gl || null;

/** 
	@constructor 
	@extends LAB.app.BaseApp
*/
LAB.app.ThreeApp = function()
{
	LAB.app.BaseApp.call( this );
	
	this.container;
	this.camera, this.scene, this.projector, this.renderer;
	this._canvas = null;

	this.mouse = { x: 0, y: 0 };
	this._width = 0;
	this._height = 0;
}

LAB.app.ThreeApp.prototype = new LAB.app.BaseApp();
LAB.app.ThreeApp.prototype.constructor = LAB.app.ThreeApp;
LAB.app.ThreeApp.prototype.supr = LAB.app.BaseApp.prototype;

/************************************************************
	SETUP
************************************************************/

	/** 
		Call to set up Webgl, initialize the canvas, provide default THREE vars
		and start animate() loop
		@function 
		@public
		@param width (optional) width of renderer
		@param height (optional) height of renderer
	*/

	LAB.app.ThreeApp.prototype.begin = function(parameters)
	{
		parameters = parameters || {};
		/**
		* default THREE camera
		* @type THREE.Camera
		*/
		console.log("base app set up");
		
		// listen to mouse + keys by default
		this.registerKeyEvents();
		this.registerMouseEvents();
		
		this.camera = new LAB.three.Camera( 35, window.innerWidth / window.innerHeight, .1, 2000 );
        this.camera.setToWindowPerspective();
        this.camera.usePushPop( true );
		//this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
		
		/**
		* default THREE scene
		* @type THREE.Scene
		*/
		this.scene = new THREE.Scene();
		this.scene.add(this.camera);
      			
		/**
		* default THREE projector
		* @type THREE.Projector
		*/
		this.projector = new THREE.Projector();
		
		/**
		* default THREE renderer with anti-aliasing, depth sorting off
		* @type THREE.WebGLRenderer
		*/
		this._width = parameters.width || window.innerWidth;
		this._height = parameters.height || window.innerHeight;

		// create canvas so we can customize it a bit
		this._canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElement( 'canvas' );
		this._canvas.id = "labCanvas";

		this.renderer = new THREE.WebGLRenderer( { antialias: parameters.antialias !== undefined ? parameters.antialias : true, canvas:this._canvas } );
		this.renderer.sortObjects = false;
		this.renderer.setSize( this._width, this._height );
      	//this.renderer.autoClear = false;

		// do we have a container?
	
		if (document.getElementById("labContainer") != null){
			this.container = document.getElementById("labContainer");
		} else {
			console.log("no labContainer in document, generating container div")
			this.container = document.createElement( 'div' );
			if (document.body)
				document.body.appendChild( this.container );
			else
				return;
		}
		
		this.container.appendChild(this.renderer.domElement);	
		
		gl = gl || this.renderer.getContext();
		
		this.setup();
		this.animate();
	}

/************************************************************
	DRAW: override the draw function in your app!
************************************************************/


/************************************************************
	THREE APP SETTERS
************************************************************/

	LAB.app.ThreeApp.prototype.__defineSetter__("canvasWidth", function(val){
		console.log("error: please don't set this variable");
	})

	LAB.app.ThreeApp.prototype.__defineSetter__("canvasHeight", function(val){
		console.log("error: please don't set this variable");
	})

	LAB.app.ThreeApp.prototype.__defineGetter__("canvasWidth", function(){
		return this._width;
	})

	LAB.app.ThreeApp.prototype.__defineGetter__("canvasHeight", function(){
		return this._height;
	})

