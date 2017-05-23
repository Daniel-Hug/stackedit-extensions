// Auto-link Bible verse references
///////////////////////////////////////

// config
window.refTagger = {
	settings: {
		noSearchClassNames: ['editor-content', 'navbar'],           
		tagChapters: true
	}
};

// create <script>
var refTaggerScript = document.createElement('script');
refTaggerScript.src = '//api.reftagger.com/v2/RefTagger.js';

// append <script>
var firstScript = document.getElementsByTagName('script')[0];
firstScript.parentNode.insertBefore(refTaggerScript, firstScript);

on('PreviewFinished', function() {
	refTagger.tag();
});
