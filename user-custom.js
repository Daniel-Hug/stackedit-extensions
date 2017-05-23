// Allow multiple listeners on userCustom events
var on = (function() {
	var handlersByEvent = {};
	
	for (var method in userCustom) {
		if (method.slice(0, 2) !== 'on') continue;
		var event = method.slice(2);
		var old = userCustom[method];
		userCustom[method] = function() {
			var args = arguments;
			if (typeof old === 'function') old.apply(this, args);
			if (Array.isArray(handlersByEvent[event])) {
				handlersByEvent[event].forEach(function(handler) {
					handler.apply(this, args);
				}, this);
			}
		};
	}
	
	return function addEventListener(event, handler) {
		handlersByEvent[event] = handlersByEvent[event] || [];
		handlersByEvent[event].push(handler);
	};
})();

function makeRequest(url, cb) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
			cb(request.responseText);
		}
	};
	request.open('GET', url);
	request.send();
}

function loadScript(url, cb) {
	var prefix = '(function(define) {';
	var postfix = '})();';

	makeRequest(url, function(js) {
		var script = document.createElement('script');
		script.text = prefix + js + postfix;
		script.onload = cb;
		document.body.appendChild(script);
	});
}

loadScript('https://daniel-hug.github.io/stackedit-extensions/reftagger.js');
loadScript('https://daniel-hug.github.io/stackedit-extensions/custom-css.js');
loadScript('https://daniel-hug.github.io/stackedit-extensions/oeis-linker.js');
