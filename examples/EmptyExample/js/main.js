var app;

$(document).ready( function() {
	DemoApp.prototype = $.extend(true, SUD.app.BaseApp.prototype, DemoApp.prototype);
	app 	= new DemoApp();
	app.begin();
});

// ===========================================
// ===== DEMO APP
// ===========================================

	DemoApp = function(){
		SUD.app.BaseApp.call( this );
		
		//-------------------------------------------------------
		this.setup = function (){
		}

		//-------------------------------------------------------
		this.update = function (){
		}

		//-------------------------------------------------------
		this.draw = function (){
		}	

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
	
