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


loadScript('https://daniel-hug.github.io/stackedit-extensions/reftagger.js');
loadScript('https://daniel-hug.github.io/stackedit-extensions/custom-css.js');
loadScript('https://daniel-hug.github.io/stackedit-extensions/oeis-linker.js');

function loadScript(url, cb) {
	var s = document.createElement('script');
	s.src = url;
	s.defer = true;
	var avoidRequireJS = typeof define === 'function' && define.amd;
	if (avoidRequireJS) {
		var tmp = define;
		define = null;
	}
	s.onload = function() {
		if (avoidRequireJS) define = tmp;
		if (cb) cb();
	};
	document.body.appendChild(s);
}
