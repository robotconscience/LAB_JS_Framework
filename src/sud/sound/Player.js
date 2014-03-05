/** @namespace SUD.sound*/
SUD.sound = SUD.sound || {};

SUD.require(SUD.src+"EventDispatcher.js");

/** 
 @constructor 
 @augments SUD.EventDispatcher
 @param {HTMLElement} parent pass in an element to attach the player to
 @param {Boolean} loop 
 @param {Boolean} autoplay
 @param {Boolean} controls
 */
SUD.sound.Player = function( parent, loop, autoplay, controls ){		
	SUD.EventDispatcher.call( this, this );
	
	this.loop 		= loop || false;
	this.autoplay 	= autoplay || false;
	this.controls	= controls || false;
	
	this.eventsRegistered = false;
	
	if (!parent){
		console.log ("ERROR! please pass in an HTML element to attach the player to");
	} else {
		this.playerElement = document.createElement("audio");
		this.playerElement.style.border = "0px none";
		if (this.loop){
			this.playerElement.setAttribute('loop', 'loop');			
		}
		if (this.autoplay){
			this.playerElement.setAttribute('autoplay', 'autoplay');			
		}
		if (this.controls){
			this.playerElement.setAttribute('controls', 'controls');			
		}
		parent.appendChild(this.playerElement);
		this.playerElement.parent = parent;
	}	
}

// extend Event Dispatcher

SUD.sound.Player.prototype = new SUD.EventDispatcher();
SUD.sound.Player.prototype.constructor = SUD.sound.Player;
SUD.sound.Player.prototype.supr = SUD.EventDispatcher.prototype;

// METHODS

SUD.sound.Player.prototype.loadFile 		= function( url )
{	
	this.registerEvents();
	this.playerElement.setAttribute('src', url );
	this.playerElement.load();
}

// PLAYBACK METHODS

SUD.sound.Player.prototype.play	= function(){
	this.playerElement.play();
}

SUD.sound.Player.prototype.pause	= function(){
	this.playerElement.pause();
}

SUD.sound.Player.prototype.setVolume	= function(volume){
	this.playerElement.volume = volume;
}

SUD.sound.Player.prototype.seekTo	= function(time){
	this.playerElement.currentTime = time;
}

// EVENTS

/**
@function
@private
*/
SUD.sound.Player.prototype.registerEvents = function(){
	if (this.eventsRegistered) return;
	
	// register events
	this.playerElement.addEventListener("load", this.onLoad);
	this.playerElement.addEventListener("ended", this.onEnded);
	this.playerElement.addEventListener("error", this.onError);
	this.eventsRegistered = true;
}

/**
@function
@private
*/
SUD.sound.Player.prototype.onLoad	= function(event){
	this.dispatchEvent("onLoad", event);
}

/**
@function
@private
*/
SUD.sound.Player.prototype.onEnded	= function(event){
	this.dispatchEvent("onEnded", event);	
}

/**
@function
@private
*/
SUD.sound.Player.prototype.onError	= function(event){
	console.log(event);
	this.dispatchEvent("onError", event);	
}

// Getters
/**
@function
*/
SUD.sound.Player.prototype.getElement = function()
{
	return this.playerElement;
}
/**
@function
@param {boolean} bLoop
*/
SUD.sound.Player.prototype.isLooping = function( bLoop )
{
	return this.loop;
}
/**
@function
@param {boolean} bAutoplay
*/
SUD.sound.Player.prototype.isAutoplay = function( bAutoplay )
{
	return this.autoplay;
}

/**
@function
@param {boolean} bControls
*/
SUD.sound.Player.prototype.hasControls = function( bControls )
{
	return this.controls;
}

// Setters
/**
@function
*/

SUD.sound.Player.prototype.setLooping = function( bLoop )
{
	this.loop = bLoop;
	if (this.loop){
		this.playerElement.setAttribute('loop', 'loop');			
	} else {
		this.playerElement.removeAttribute('loop');
	}
}
/**
@function
*/
SUD.sound.Player.prototype.setAutoplay = function( bAutoplay )
{
	this.autoplay = bAutoplay;
	if (this.autoplay){
		this.playerElement.setAttribute('autoplay', 'autoplay');			
	} else {
		this.playerElement.removeAttribute('autoplay');
	}
};
/**
@function
*/
SUD.sound.Player.prototype.setControls = function( bControls )
{
	this.controls = bControls;
	if (this.controls){
		this.playerElement.setAttribute('controls', 'controls');			
	} else {
		this.playerElement.removeAttribute('controls');
	}
};