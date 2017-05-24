(function() {
	if (window.userCustomFinished) return;
	window.userCustomFinished = true;

	function capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	// Allow multiple listeners on userCustom events
	function on(event, handler) {
		var method = 'on' + capitalize(event);
		var old = userCustom[method];
		userCustom[method] = function() {
			if (typeof old === 'function') old.apply(this, arguments);
			handler.apply(this, arguments);
		};
	}

	function makeRequest(url, cb) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
				cb(request.responseText);
			}
		};
		request.open('GET', url, true);
		request.send();
	}

	function loadScript(url, cb) {
		makeRequest(url, function(js) {
			new Function('on', 'loadScript', 'define', js)(on, loadScript);
			if (cb) cb();
		});
	}

	loadScript('https://daniel-hug.github.io/stackedit-extensions/reftagger.js');
	loadScript('https://daniel-hug.github.io/stackedit-extensions/custom-css.js');
	loadScript('https://daniel-hug.github.io/stackedit-extensions/oeis-linker.js');
})();
