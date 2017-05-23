// custom CSS in preview
//////////////////////////////

// pass a function-encased multi-line comment
// returns the multi-line string in the comment
function hereDoc(f) {
	return f.toString()
		.replace(/^[^/]+\/\*!?/, '')
		.replace(/\*\/[^/]+$/, '');
}

// Pass a function containing css rules in a comment. They will be
// added to a <style> element which will be appended to the <head>.
function embedStyle(fn) {
	// get CSS
	var css = hereDoc(fn);

	// create <style>
	var style = document.createElement('style');
	style.innerHTML = css;

	// append <style>
	document.head.appendChild(style);
}

on('Ready', function() {
	embedStyle(function() {/*!
	ul, ol, li {
	  position: relative;
	}
	li {
	  page-break-inside: avoid;
	}
*/});
});
