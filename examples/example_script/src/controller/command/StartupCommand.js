/**
 * @constructor
 * @class StartupCommand
 * @extends SimpleCommand
 */
function StartupCommand() {
	SimpleCommand.apply(this, arguments);
}

/**
 * @description Inheritance
 */
StartupCommand.prototype = new SimpleCommand;
StartupCommand.prototype.constructor = StartupCommand;

/**
 * @override
 * @public
 * @param {Notification} note
 */
StartupCommand.prototype.execute = function (note) {

	var eventData = note.getBody();
	if ((eventData === null) || (eventData === undefined)) {
		/*DEVELOP*/ throw new Error("eventData required");
	}

	// Check AE version
	if (as_compareVersions(this.facade.getAEMinVersion(), app.version) < 0) {
		alert("This script requires Adobe After Effects (" + JSON.stringify(this.facade.getAEMinVersion()) + ") or later.");
		return;
	}
	
	// Check AE prefs
	if (as_checkSecurityPrefSet() !== true) {
		alert("This script requires the scripting security preference to be set. Go to the \"General\" panel of the application preferences and make sure \"Allow Scripts to Write Files and Access Network\" is checked.");
		return;
	}

	// --- Prepare managers and proxies
	UndoManager.getInstance().initializeManager(this.facade.getScriptName());
	this.facade.registerProxy(new CommandCenter());
	
	// --- Prepare controller
	this.facade.registerCommand(MacroCommandName.SHOW_WINDOW, ShowWindowCommand);
	this.facade.registerCommand(MacroCommandName.MANIPULATE, ManipulateCommand);

	// --- Prepare view

	// Show window
	this.facade.sendNotification(MacroCommandName.SHOW_WINDOW, eventData, EventName.SHOW_MAIN_WINDOW);
}
