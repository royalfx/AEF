{
	// Include
	// #include "../../../lib/json2.js";

	/**
	 * @version 0.0.1
	 * @date Mar 22 2021
	 * @author Oleksandr Semeniuk
	 * @param {*} winObj window or global
	 */
	$.ExampleScript = function (winObj) {

		// Include
		// #include "../../../lib/eslib_ae_1.0.0.jsxinc";
		#include "/d/Dropbox/Library/ExtendScript/scripts/extendscript_lib/bin/eslib_ae_1.0.0.jsxinc";

		// #include "../../../lib/aef_es_1.0.0.jsxinc";
		#include "../../../include/include_aef_es.jsxinc";

		#include "../include/include.jsxinc";

		// Assets
		#include "../assets/example_ui_data.js";

		
		// Create facade
		var facade = ExampleScriptFacade.getInstance(FacadeName.EXAMPLE_SCRIPT);

		// Register startup command
		facade.registerCommand(EventName.STARTUP, StartupCommand);

		// Startup
		var eventData = {};
		eventData[DataKey.ITEM_BODY] = winObj;
		eventData[DataKey.UI_DATA] = example_ui_data;
		facade.sendNotification(EventName.STARTUP, eventData);

	}

	// /*RELEASE*/ try {
	$.ExampleScript(this);
	// /*RELEASE*/ } catch (error) {
	// /*RELEASE*/ alert(error.name + "\n" + error.message + "\nfile: " + $.fileName + "\nline: " + error.line, undefined, true);
	// /*RELEASE*/ }
}