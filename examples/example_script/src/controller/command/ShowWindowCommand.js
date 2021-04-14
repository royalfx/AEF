/**
 * @constructor
 * @class ShowWindowCommand
 * @extends SimpleCommand
 */
function ShowWindowCommand() {
	SimpleCommand.apply(this, arguments);
}

/**
 * @description Inheritance
 */
ShowWindowCommand.prototype = new SimpleCommand;
ShowWindowCommand.prototype.constructor = ShowWindowCommand;

/**
 * @public
 * @override
 * @param {Notification} note
 */
ShowWindowCommand.prototype.execute = function (note) {

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

	// --- Register windows mediators

	switch (subCommandName) {

		case EventName.SHOW_MAIN_WINDOW:
			if (!this.facade.hasMediator(MainWindowMediator.NAME)) {
				var winObj = eventData[DataKey.ITEM_BODY];
				var uiData = eventData[DataKey.UI_DATA];
				this.facade.registerMediator(new MainWindowMediator(new MainWindowComponent(winObj, uiData)));
			}
			// Send notification for Mediator
			this.sendNotification(EventName.SHOW_MAIN_WINDOW, eventData);
			break;

		default:
			/*DEVELOP*/throw new Error("Unknown event name.");
	}

	// Complete command
	if (commandCenter.isPrimaryCommand(this)) {
		commandCenter.completeCommand();
	}
}