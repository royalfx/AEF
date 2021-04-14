/**
 * @constructor
 * @class ManipulateCommand
 * @extends SimpleCommand
 */
function ManipulateCommand() {
	SimpleCommand.apply(this, arguments);
}

/**
 * @description Inheritance
 */
ManipulateCommand.prototype = new SimpleCommand;
ManipulateCommand.prototype.constructor = ManipulateCommand;

/**
 * @public
 * @override
 * @param {Notification} note
 */
ManipulateCommand.prototype.execute = function (note) {
	
	var eventData = note.getBody();
	if ((eventData === null) || (eventData === undefined)) {
		/*DEVELOP*/ throw new Error("eventData required");
	}

	var subCommandName = note.getType();
	if ((subCommandName === null) || (subCommandName === undefined)) {
		/*DEVELOP*/ throw new Error("subCommandName required");
	}

	// Init Command
	var commandCenter = this.facade.retrieveProxy(ProxyName.COMMAND_CENTER);
	if (!commandCenter.isInitialized()) {
		commandCenter.initializeCommand(this);
	}

	alert(subCommandName);

	// Re sync selection
	this.facade.sendNotification(EventName.SYNC_AE, {});

	// Complete command
	if (commandCenter.isPrimaryCommand(this)) {
		commandCenter.completeCommand();
	}
}