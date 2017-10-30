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
	
	/* differentiate nested <mark> elements with a gamut of colors */
	mark {
		color: #000;
		transition: background-color 0.2s ease-in;
	}

	mark,
	mark:hover,
	mark:hover mark {
		background: hsl(0, 100%, 90%);
	}

	mark > mark,
	mark > mark:hover,
	mark > mark:hover mark {
		background: hsl(60, 100%, 85%);
	}

	mark > mark > mark,
	mark > mark > mark:hover,
	mark > mark > mark:hover mark {
		background: hsl(120, 100%, 80%);
	}

	mark > mark > mark > mark,
	mark > mark > mark > mark:hover,
	mark > mark > mark > mark:hover mark {
		background: hsl(180, 100%, 75%);
	}

	mark > mark > mark > mark > mark,
	mark > mark > mark > mark > mark:hover,
	mark > mark > mark > mark > mark:hover mark {
		background: hsl(240, 100%, 70%);
	}

	mark > mark > mark > mark > mark > mark,
	mark > mark > mark > mark > mark > mark:hover,
	mark > mark > mark > mark > mark > mark:hover mark {
		background: hsl(300, 100%, 65%);
	}
*/});
});
