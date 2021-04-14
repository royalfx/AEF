/**
 * @constructor
 * @class ManipulateMeditor
 * @extends BaseMediator
 */
function ManipulateMeditor(viewComponent) {
	BaseMediator.apply(this, [ManipulateMeditor.NAME, viewComponent]);
}

/**
 * @description Inheritance
 */
var Transitive = new Function;
Transitive.prototype = BaseMediator.prototype;
ManipulateMeditor.prototype = new Transitive;
ManipulateMeditor.prototype.constructor = ManipulateMeditor;

/** 
 * @override
 */
ManipulateMeditor.prototype.onRegister = function() {
	
	// Initialize component
	this.viewComponent.initializeComponent();
	// Add handlers
	this.viewComponent.addEventListener(EventName.ROTATE_LEFT, this._handleViewEvent, this);
	this.viewComponent.addEventListener(EventName.ROTATE_RIGHT, this._handleViewEvent, this);
	this.viewComponent.addEventListener(EventName.MOVE_LEFT, this._handleViewEvent, this);
	this.viewComponent.addEventListener(EventName.MOVE_RIGHT, this._handleViewEvent, this);
	this.viewComponent.addEventListener(EventName.MOVE_UP, this._handleViewEvent, this);
	this.viewComponent.addEventListener(EventName.MOVE_DOWN, this._handleViewEvent, this);
}

/** 
 * @override
 */
ManipulateMeditor.prototype.listNotificationInterests = function() {
	return [
		EventName.SHOW_MAIN_WINDOW,
		EventName.MODEL_UPDATED
	];
}

/** 
 * @override
 * @protected
 * @param {string} eventName
 * @param {Object} eventData
 */
ManipulateMeditor.prototype._handleViewEvent = function (eventName, eventData) {

	switch (eventName) {

		case EventName.ROTATE_LEFT:
			this.sendNotification(MacroCommandName.MANIPULATE, eventData, eventName);
			break;

		case EventName.ROTATE_RIGHT:
			this.sendNotification(MacroCommandName.MANIPULATE, eventData, eventName);
			break;

		case EventName.MOVE_LEFT:
			this.sendNotification(MacroCommandName.MANIPULATE, eventData, eventName);
			break;

		case EventName.MOVE_RIGHT:
			this.sendNotification(MacroCommandName.MANIPULATE, eventData, eventName);
			break;

		case EventName.MOVE_UP:
			this.sendNotification(MacroCommandName.MANIPULATE, eventData, eventName);
			break;

		case EventName.MOVE_DOWN:
			this.sendNotification(MacroCommandName.MANIPULATE, eventData, eventName);
			break;

		default:
			break;
	}
}

/** 
 * @override
 */
ManipulateMeditor.prototype.handleNotification = function(note) {


	switch (note.getName()) {

		case EventName.SHOW_MAIN_WINDOW:
			this._updateViewComponent();
			break;

		case EventName.MODEL_UPDATED:
			var scopeInterests = [
				UpdatesScope.AE_SELECTION
			];
			var scope = note.getBody();
			if (as_arrayCheckValues(scopeInterests, scope) > 0) {
				this._updateViewComponent();
			}
			break;

		default:
			//
	}
}

/**
 * @override
 * @protected
 */
ManipulateMeditor.prototype._updateViewComponent = function () {
	//
}

/**
 * @constant
 * @type {string}
 * @description Instance name
 */
ManipulateMeditor.NAME = "ManipulateMeditor";