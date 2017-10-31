// custom CSS in preview
//////////////////////////////

// pass a function-encased multi-line comment
// returns the multi-line string in the comment
function hereDoc(f) {
	// return the function's representation as a string
	return f.toString()
		// except, if the string starts with one or more characters other than a forward slash
		// which are followed by "/*" and then optionally followed by "!", remove this whole prefix.
		.replace(/^[^/]+\/\*!?/, '')
		// and, if "*/" appears followed by one or more characters other
		// than a forward slash to end the string, remove this whole suffix.
		.replace(/\*\/[^/]+$/, '');
}

// Pass a function containing css rules in a comment. They will be
// added to a <style> element which will be appended to the <head>.
function embedStyle(fn) {
	// get the CSS placed in a multi-line comment in the passed function
	var css = hereDoc(fn)
		// and replace any "//" with "/*", and to the zero or more characters other
		// than a new line that follow append the suffix "*/"
		.replace(/\/\/(.*)/g, '/*$1*/');

	// create <style>
	var style = document.createElement('style');
	style.innerHTML = css;

	// append <style>
	document.head.appendChild(style);
}

debugger;
on('Ready', function() {
	embedStyle(function() {/*!
	ul, ol, li {
		position: relative;
	}
	li {
		page-break-inside: avoid;
	}
	
	.small-caps {
		font-variant: small-caps;
	}
	
	// differentiate nested <mark> elements with a gamut of colors
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
