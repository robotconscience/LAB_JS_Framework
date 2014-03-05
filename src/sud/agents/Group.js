/** @namespace SUD.agents */
SUD.agents = SUD.agents || {};

/** @constructor */
SUD.agents.Group = function() {
	this.Agents = [];
}

SUD.agents.Group.prototype.addToGroup = function(Agent) {
	// console.log("Added to Group" + Agent);
	console.log(this.Agents);
	this.Agents.push(Agent);
}

SUD.agents.Group.prototype.update = function() {
	var i = 0;
	for (i=0; i<this.Agents.length; i++) {
		this.Agents[i].update();
		this.Agents[i].applyBehaviors();
	}
}

SUD.agents.Group.prototype.draw = function() {
	var i = 0;
	for (i=0; i<this.Agents.length; i++) {
		this.Agents[i].draw();
	}
}

var thing = $.extend(true, SUD.agents.Group.prototype, SUD.agents.Agent.prototype); // How should we fix this?