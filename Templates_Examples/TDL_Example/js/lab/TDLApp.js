// include LabBase files
//LAB.require("js/tdl/base.js");
LAB.require("js/lab/BaseApp.js");

// include TDL utils from Lars
LAB.require('js/lab/tdlUtils/LabUtils.js');
LAB.require('js/lab/tdlUtils/LabMesh.js');
LAB.require('js/lab/tdlUtils/LabObject.js');
LAB.require('js/lab/tdlUtils/LabShader.js');

LAB.TDLApp = function()
{
	LAB.BaseApp.call( this );
	
	// declare all the base vars

	this.canvas;               // the canvas
	
	this.lastTime = 0;
	this.elapsedTime = 0;
	this.labTimeDelta=0;
	this.fpsElem = null;
	this.labFPS;
	this.deltaTime;
	
	this.labEyePos = [0, 0, 0];
}	
	
/************************************************************
	EXTEND
************************************************************/
	
	LAB.TDLApp.prototype = new LAB.BaseApp();
	LAB.TDLApp.prototype.constructor = LAB.TDLApp;
	LAB.TDLApp.prototype.supr = LAB.BaseApp.prototype;

/************************************************************
	SETUP
************************************************************/

	LAB.TDLApp.prototype.begin = function()
	{
		console.log('begin');
		//math and matrix
		math = tdl.math;
		fast = tdl.fast;

		//setup canvas and context
				
		if (document.getElementById("canvas") != null){
			this.canvas = document.getElementById("canvas");
		} else {
			console.log("no canvas in document, generating")
			this.canvas = document.createElement( 'canvas' );
			this.canvas.width 	= window.innerWidth;
			this.canvas.height	= window.innerHeight;
			
			if (document.body)
				document.body.appendChild( this.canvas );
			else
				return;
		}
		
		g_fpsTimer = new tdl.fps.FPSTimer();
		
		console.log(tdl);
		console.log(tdl.webGL);

		GL = tdl.webgl.setupWebGL(this.canvas);
		if (!GL) {
			console.log("ERROR SETTING UP GL");
			return false;
		}
		if (g_debug) {
			GL = tdl.webgl.makeDebugContext(GL, undefined, LogGLCall);
		}

		// util function stored in LabUtils
		// !!!! needs to be refactored
		labSetMatrices();
		this.setup();
		this.animate();
		
		this.bOrthographic = false;
	}

/************************************************************
	UPDATING: OVERRIDE PREUPDATE TO PREP MATRICES
************************************************************/

	LAB.TDLApp.prototype.preupdate = function(){
		var now = (new Date()).getTime();
		if(this.lastTime == 0.0) {
 			this.deltaTime = 0.0;
	   	} else {
	      this.deltaTime = this.now - this.lastTime;
	   	}
		this.lastTime 		= this.now;
		this.labTimeDelta 	= this.deltaTime;

		g_fpsTimer.update(this.deltaTime * .001);//<--- to milliseconds?
		if (this.fpsElem != null){
			this.fpsElem.innerHTML = g_fpsTimer.averageFPS;		
		} 

		this.labFPS = g_fpsTimer.instantaneousFPS;
		this.elapsedTime += this.deltaTime;
	}

/************************************************************
	DRAWING: OVERRIDE PREDRAW AND POSTDRAW TO SET UP GL CTX
************************************************************/


	LAB.TDLApp.prototype.predraw = function(){
	   	// turn off logging after 1 frame.
	   	g_logGLCalls = false;
	
		GL.clearColor( 1,1,1,1 );
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT );

		GL.disable( GL.DEPTH_TEST );
		GL.enable( GL.BLEND );
		GL.blendFunc( GL.SRC_ALPHA , GL.ONE_MINUS_SRC_ALPHA);
	
		GL.viewport(0, 0, this.canvas.width, this.canvas.height);//fit viewport to screen
		
		labPushMatrix();
		
		// give you an option to push to orthographic (flat) projection
		if (this.bOrthographic){			
			labPushProjection();
			//remake perspective     
			fast.identity4( projectionMatrix );                          
			projectionMatrix = tdl.math.matrix4.orthographic(0, canvas.width, 0, canvas.height, nearClip, farClip);
			//remake modelview matrix
			fast.identity4(modelviewMatrix);

			//move to upper left corner and scale. mimics openframeworks setup
			labScale(1,-1,1);
			labTranslate(0, -canvas.height, 0);
		}
	};
	
	LAB.TDLApp.prototype.postdraw = function(){
		if (this.bOrthographic) labPopProjection();
		labPopMatrix();
	}
