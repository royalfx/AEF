{
	(function prebuild() {

		// Include
		#include "../../../lib/json2.js";
		#include "../../../lib/eslib_ae_1.0.0.jsxinc";

		// Include utils
		#includepath "../../../src/utils";
		#include "as_createUIDataFile.jsxinc";

		// Directories
		var rootDir = Folder(new File($.fileName).path).parent;

		// UI
		as_createUIDataFile(File(rootDir.fullName + "/assets/ui/example_ui_data.csv"), File(rootDir.fullName + "/assets/example_ui_data.js"));

		// Include
		var filterFileExt = ["js"];
		var outFile = File(rootDir.fullName + "/include/include.jsxinc");
		as_fileWrite(outFile, as_fileCollectIncludes([
			Folder(rootDir.fullName + "/src/const"),
			Folder(rootDir.fullName + "/src/controller"),
			Folder(rootDir.fullName + "/src/model"),
			Folder(rootDir.fullName + "/src/view"),
			File(rootDir.fullName + "/src/ExampleScriptFacade.js")
		], rootDir, true, filterFileExt));

	})();
}