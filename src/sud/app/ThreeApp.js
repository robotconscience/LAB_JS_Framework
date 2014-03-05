// include sudBase files

/** @namespace SUD.app */
SUD.require(SUD.src+"app/BaseApp.js");

// SUD Three includes

SUD.require(SUD.src+"three/Camera.js");
SUD.require(SUD.src+"three/Geometry.js");
SUD.require(SUD.src+"three/Mesh.js");
SUD.require(SUD.src+"three/Object.js");
SUD.require(SUD.src+"three/ParticleEmitter.js");
SUD.require(SUD.src+"three/Shader.js");

/**
* global gl reference to mirror normal openGL
* @type WebGLContext
*/
var gl = gl || null;

/** 
	@constructor 
	@extends SUD.app.BaseApp
*/
SUD.app.ThreeApp = function()
{
	SUD.app.BaseApp.call( this );
	
	this.container = null;
	this.camera = null;
	this.scene = null;
	this.projector = null;
	this.renderer = null;
	this._canvas = null;

	this.mouse = { x: 0, y: 0 };
	this._width = 0;
	this._height = 0;
}

SUD.app.ThreeApp.prototype = new SUD.app.BaseApp();
SUD.app.ThreeApp.prototype.constructor = SUD.app.ThreeApp;
SUD.app.ThreeApp.prototype.supr = SUD.app.BaseApp.prototype;

/************************************************************
	SETUP
************************************************************/

	/** 
		Call to set up Webgl, initialize the canvas, provide default THREE vars
		and start animate() loop
		@function 
		@public
		@param {Object} parameters Options are:<br>width = {Integer} width of canvas <br>height = {Integer} height of canvas
		<br>canvas = {DOMCanvasElement} canvas element in the DOM (creates automatically if not passed) <br>canvasId = {String} ID of canvas;
		<br>antialias = {Boolean} antialias the renderer <br>scene = {THREE.Scene} scene object to use (this.scene)
	*/

	SUD.app.ThreeApp.prototype.begin = function(parameters)
	{
		parameters = parameters || {};
		/**
		* default THREE camera
		* @type THREE.Camera
		*/
		console.log("base app set up");
		
		// listen to mouse + keys + window by default
		this.registerWindowEvents();
		this.registerKeyEvents();
		this.registerMouseEvents();
			
		/**
		* default THREE renderer with anti-aliasing, depth sorting off
		* @type THREE.WebGLRenderer
		*/
		this._width = parameters.width || window.innerWidth;
		this._height = parameters.height || window.innerHeight;

		// create canvas so we can customize it a bit
		this._canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElement( 'canvas' );
		this._canvas.id = parameters.canvasId !== undefined ? parameters.canvasId : "sud_canvas";

		this.renderer = new THREE.WebGLRenderer( { antialias: (parameters.antialias !== undefined ? parameters.antialias : true), canvas:this._canvas } );
		this.renderer.sortObjects = false;
		this.renderer.setSize( this._width, this._height );
      	//this.renderer.autoClear = false;

		this.camera = new THREE.PerspectiveCamera(60, this._width / this._height, .1, 2000);
	    this.camera.position.set( 0, 0, 50 );
	    this.camera.lookAt( new THREE.Vector3(0, 0, 0) );

		//this.camera = new SUD.three.Camera( 60, this._width / this._height, .1, 2000 );
        //this.camera.setPerspective( 60, this._width, this._height );
        //this.camera.usePushPop( true );
		
		/**
		* default THREE scene
		* @type THREE.Scene
		*/
		this.scene = parameters.scene || new THREE.Scene();
		this.scene.add(this.camera);
      			
		/**
		* default THREE projector
		* @type THREE.Projector
		*/
		this.projector = new THREE.Projector();
      	
		// do we have a container?
	
		if (document.getElementById("sud_container") != null){
			this.container = document.getElementById("sud_container");
		} else {
			console.log("no sud_container in document, generating container div")
			this.container = document.createElement( 'div' );
			if (document.body){
				document.body.appendChild( this.container );
			} else {
 				return;
			}
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

	SUD.app.ThreeApp.prototype.__defineSetter__("canvasWidth", function(val){
		console.log("error: please don't set this variable");
	});

	SUD.app.ThreeApp.prototype.__defineSetter__("canvasHeight", function(val){
		console.log("error: please don't set this variable");
	});

	SUD.app.ThreeApp.prototype.__defineGetter__("canvasWidth", function(){
		return this._width;
	});

	SUD.app.ThreeApp.prototype.__defineGetter__("canvasHeight", function(){
		return this._height;
	});

