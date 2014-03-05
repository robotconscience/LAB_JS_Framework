var ClassA = function() {
	"use strict";
	var self = this;
	this.className = "ClassA";
	SUD.EventDispatcher.call(this, this);
	
	setTimeout(dispatch, 2000);

	function dispatch() {
		// also demonstrates ability to override the target property
		var params = {secret: "chicken", superTopSecret: "melon", target: self};
		self.dispatchEvent(new SUD.Event("timeout"), params);
	}
}

ClassA.prototype = new SUD.EventDispatcher;
ClassA.prototype.constructor = ClassA;