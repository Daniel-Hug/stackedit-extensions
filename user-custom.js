(function() {
	// only execute once
	if (window.userCustomFinished) return;
	window.userCustomFinished = true;

	// Allow multiple listeners on userCustom events
	var on = (function() {
		var handlersByEvent = {};
		var contextAndArgsOfLastFiringByEvent = {};
		var events = ['PreviewFinished', 'Ready'];

		events.forEach(function(event) {
			userCustom['on' + event] = function() {
				var args = arguments;
				contextAndArgsOfLastFiringByEvent[event] = {
					context: this,
					args: args
				};
				(handlersByEvent[event] || []).forEach(function(handler) {
					handler.apply(this, args);
				}, this);
			};
		});

		function capitalize(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}

		return function addEventListener(event, handler) {
			var event = capitalize(event);
			handlersByEvent[event] = handlersByEvent[event] || [];
			if (contextAndArgsOfLastFiringByEvent[event]) {
				var context = contextAndArgsOfLastFiringByEvent[event].context;
				var args = contextAndArgsOfLastFiringByEvent[event].args;
				handler.apply(context, args);
			}
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
