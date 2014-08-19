// ==UserScript==
// @name       	MS Redirection Helper
// @author		Michael Kriese
// @namespace  	http://www.visualon.de/ms
// @version    	0.2
// @description	MS Redirection Helper
// @match    	http://msdn.microsoft.com/*
// @match    	http://technet.microsoft.com/*
// @copyright  	2014 VisualOn GmbH
// @run-at 		document-start
// ==/UserScript==

(function () {
    var path = location.pathname;
    
    if (path.match(/^\/\w{2}-\w{2}\/library\//gi) && ! path.match(/^\/en-us\/library\//gi)){
        var uri = location.href;
        uri = uri.replace(/\/\w{2}-\w{2}\//gi, "/en-us/");
        location.href = uri;
    }
})();