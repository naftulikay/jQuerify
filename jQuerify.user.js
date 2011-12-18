// ==UserScript==
// @name            jQuerify
// @namespace       http://tkassembled.com/ns/jQuerify
// @description     Injects jQuery into all pages which don't already have it installed. 
// @include         *
// @copyright       TK Kocheran
// @version         1.0.0
// @license         GPL http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var scripts = document.getElementsByTagName("script");
var script = null;

var found = false;

for (var i = 0; i < scripts.length; i++) {
    script = scripts[i];
//  TODO this is still kind of loose, it'll match jQuery plugins.
    if (/^jQuery.*\.js$/i.test(script.src)) {
        found = true;
        break;
    }
}

if (!found) {
    try {
        $ || jQuery || $ === jQuery;
        found = true;
    } catch (err) {
        
    }
}

if (!found) {
//  inject it.
    script = document.createElement("script");
    script.type = "text/javascript";
    
    var protocol = /^https:/i.test(document.location) ? "https" : "http";
    script.src = protocol + "://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
    document.getElementsByTagName("body")[0].appendChild(script);
}
