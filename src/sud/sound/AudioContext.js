/** @namespace SUD.sound*/
SUD.sound = SUD.sound || {};

if (typeof webkitAudioContext == "function") {
    SUD.sound.Context 	= SUD.sound.Context || new webkitAudioContext();
};