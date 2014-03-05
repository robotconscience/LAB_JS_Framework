SUD.require("../../libs/tsps/TSPSApp.js");

var app;

$(document).ready( function() {
	DemoApp.prototype = $.extend(true, SUD.app.BaseApp.prototype, SUD.app.TSPSApp.prototype, DemoApp.prototype);
	app 	= new DemoApp();
	app.begin();
});

// ===========================================
// ===== DEMO APP
// ===========================================

	DemoApp = function(){
		SUD.app.BaseApp.call( this );
		SUD.app.TSPSApp.call( this );
		
		//-------------------------------------------------------
		this.setup = function (){
			this.connect(7681);
		}

		//-------------------------------------------------------
		this.update = function (){
		}

		//-------------------------------------------------------
		this.draw = function (){
		}	

		//-------------------------------------------------------
		this.onPersonEntered = function( person ){
		};
	
		//-------------------------------------------------------
		this.onPersonUpdated = function( person ){
			
		};

		//-------------------------------------------------------
		this.onPersonMoved = function( person ){
			
		};
	
		//-------------------------------------------------------
		this.onPersonLeft = function( person ){
			
		};

		//-------------------------------------------------------
		this.onMouseMoved = function( x,y ){
			
		};

		//-------------------------------------------------------
		this.onMousePressed = function( x,y ){
			
		};

		//-------------------------------------------------------
		this.onMouseDragged = function( x,y ){
			
		};

		//-------------------------------------------------------
		this.onMouseReleased = function( x,y ){
			
		};

		//-------------------------------------------------------
		this.onDocumentKeyDown = function( key ){
			
		};
	}
	
