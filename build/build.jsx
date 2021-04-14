{
	(function build() {

		// Include
		#include "../lib/json2.js";
		#include "../lib/eslib_ae_1.0.0.jsxinc";

		// Version
		var es_version = "1.0.0";
		var js_version = "1.0.0";

		// Directories
		var rootDir = Folder(new File($.fileName).path).parent;

		// ES
		var esOutFile = File(rootDir.fullName + "/bin/aef_es_" + es_version + ".jsxinc");
		var esOutFileInclude = File(rootDir.fullName + "/include/include_aef_es.jsxinc");
		var esContent = [
			Folder(rootDir.fullName + "/src/utils"),
			File(rootDir.fullName + "/lib/puremvc-jsx-1.0.1.js"),
			Folder(rootDir.fullName + "/src/es/const"),
			Folder(rootDir.fullName + "/src/es/error"),
			Folder(rootDir.fullName + "/src/es/manager"),
			Folder(rootDir.fullName + "/src/es/debug"),
			Folder(rootDir.fullName + "/src/es/event"),
			Folder(rootDir.fullName + "/src/es/controller/command"),
			Folder(rootDir.fullName + "/src/es/model/proxy"),
			Folder(rootDir.fullName + "/src/es/view/component"),
			Folder(rootDir.fullName + "/src/es/view/mediator"),
			File(rootDir.fullName + "/src/es/BaseFacade.js")
		];
		as_fileWrite(esOutFile, as_fileCollectLib(esContent, true, ["js"]));
		as_fileWrite(esOutFileInclude, as_fileCollectIncludes(esContent, rootDir, true, ["js"]));

		// JS
		var jsOutFile = File(rootDir.fullName + "/bin/aef_js_" + js_version + ".js");
		var jsOutFileInclude = File(rootDir.fullName + "/include/include_aef_js.jsxinc");
		var jsContent = [
			File(rootDir.fullName + "/lib/puremvc-1.0.1.js"),
			Folder(rootDir.fullName + "/src/js/debug"),
			Folder(rootDir.fullName + "/src/js/controller/command"),
			Folder(rootDir.fullName + "/src/js/model/proxy"),
			Folder(rootDir.fullName + "/src/js/view/component"),
			Folder(rootDir.fullName + "/src/js/view/mediator")
		];
		as_fileWrite(jsOutFile, as_fileCollectLib(jsContent, true, ["js"]));
		as_fileWrite(jsOutFileInclude, as_fileCollectIncludesJS(jsContent, rootDir, true, ["js"]));

	})();
}