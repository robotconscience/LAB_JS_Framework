// include base files
/** @namespace SUD.app */
//SUD.require(SUD.src+"tsps/TSPS.js");
//SUD.require(SUD.src+"app/BaseApp.js");
//SUD.require(SUD.src+"utils/WebSocket.js");

/** 
	@constructor 
	@extends SUD.app.BaseApp
	@extends TSPS.dispatcher
*/
SUD.app.TSPSApp = function()
{
	TSPS.Dispatcher.call( this );
	SUD.app.BaseApp.call( this );
	
	this.socket 	= null;
}

SUD.app.TSPSApp.prototype = $.extend(true, SUD.app.BaseApp.prototype, TSPS.Dispatcher.prototype, SUD.app.TSPSApp.prototype);

// ===========================================
// ===== METHODS
// ===========================================

/**
Connect to TSPS WebSocket
@function
*/
SUD.app.TSPSApp.prototype.connect = function (port, host)
{
	host = host || "ws://localhost";
	
	this.socket = new SUD.utils.WebSocket( host+":"+port, "tsps-protocol");
	this.socket._onMessageReceived	= this._onMessageReceived.bind(this);
	this.socket.onMessageReceived 	= this.onMessageReceieved;
	this.socket.onConnectionOpened 	= this.onConnectionOpened;
	this.socket.onConnectionClosed 	= this.onConnectionClosed;
	this.socket.connect();
	
	console.log("connecting to "+ host+":"+port);
}

// ===========================================
// ===== WEBSOCKET HANDLERS
// ===========================================

/**
Override default WS functionality
@function
@private
*/

	SUD.app.TSPSApp.prototype._onMessageReceived = function( evt ) {
		this.onMessageReceieved.bind(this)(evt.data );
	}

/**
@function
@private
*/
	SUD.app.TSPSApp.prototype.onMessageReceieved = function( data ){
		var data =  jQuery.parseJSON( data );				
		var TSPSPeople = this.newPerson(data);
	}

/**
@function
@private
*/
	SUD.app.TSPSApp.prototype.onConnectionOpened = function(){
		console.log("connection opened!");
	}

/**
@function
@private
*/
	SUD.app.TSPSApp.prototype.onConnectionClosed = function(){
		console.log("connection closed!");
	}

// ===========================================
// ===== TSPS HANDLERS
// ===========================================

/**
Override in your app that extends TSPSApp
@function
*/
	SUD.app.TSPSApp.prototype.onPersonEntered = function( person ){};
	
/**
Override in your app that extends TSPSApp
@function
*/
	SUD.app.TSPSApp.prototype.onPersonUpdated = function( person ){};

/**
Override in your app that extends TSPSApp
@function
*/
	SUD.app.TSPSApp.prototype.onPersonMoved = function( person ){};
	
/**
Override in your app that extends TSPSApp
@function
*/
	SUD.app.TSPSApp.prototype.onPersonLeft = function( person ){};
	