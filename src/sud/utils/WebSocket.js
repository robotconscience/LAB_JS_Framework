SUD.require(SUD.src+"EventDispatcher.js");

/** @namespace SUD.utils */
SUD.utils = SUD.utils || {};

/** 
	Creates a new Websocket with host (defaults to "ws://localhost:8888")
	@constructor
	@augments SUD.EventDispatcher
*/

SUD.utils.WebSocket = function( _host, protocol ) {
	this.host 		= _host || "ws://localhost:8888";
	if (protocol) this.protocol	= protocol;
	this.socket;
}

/**
@function
*/
SUD.utils.WebSocket.prototype.connect = function() {
	try {
		if (this.protocol) this.socket = new WebSocket( this.host, this.protocol );
		else this.socket = new WebSocket( this.host);
		this.socket._parent = this;
		this.socket.onmessage = this._onMessageReceived;
		this.socket.onopen = this._onConnectionOpened;
		this.socket.onclose = this._onConnectionClosed;
	} catch( ex ) {
		console.log( ex );
	}
}

/**
@function
*/
SUD.utils.WebSocket.prototype.sendData = function( data ) {
	console.log( "sending: " + data );
	this.socket.send( data );
}

SUD.utils.WebSocket.prototype._onConnectionOpened = function() { this._parent.onConnectionOpened(); }

/**
Override in your main app, e.g.:
var socket = new SUD.utils.WebSocket;
socket.onConnectionOpened = this.onConnect;
@function
*/
SUD.utils.WebSocket.prototype.onConnectionOpened = function() {};

SUD.utils.WebSocket.prototype._onConnectionClosed = function() { this._parent.onConnectionClosed(); }

/**
Override in your main app
@function
*/
SUD.utils.WebSocket.prototype.onConnectionClosed = function() {};


SUD.utils.WebSocket.prototype._onMessageReceived = function( evt ) {
	var data = evt.data;
	try {
		var data =  jQuery.parseJSON( evt.data );	
	} catch(e) {
		// not valid JSON? Other reasons for error?
	}
	this._parent.onMessageReceived( data );
}

/**
Override in your main app
@function
*/
SUD.utils.WebSocket.prototype.onMessageReceived = function( data ) {
	console.log(data);
}