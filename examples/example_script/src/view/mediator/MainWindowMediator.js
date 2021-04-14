/**
 * @constructor
 * @class MainWindowMediator
 * @extends BaseMediator
 */
function MainWindowMediator(viewComponent) {
	BaseMediator.apply(this, [MainWindowMediator.NAME, viewComponent]);
}

/**
 * @description Inheritance
 */
var Transitive = new Function;
Transitive.prototype = BaseMediator.prototype;
MainWindowMediator.prototype = new Transitive;
MainWindowMediator.prototype.constructor = MainWindowMediator;

/** 
 * @override
 */
MainWindowMediator.prototype.onRegister = function() {
	
	// Initialize component
	this.viewComponent.initializeComponent();

	// --- Register other mediators
	
	var windowComponent = this.viewComponent.getUIContainer();
	this.facade.registerMediator(new ManipulateMeditor(new ManipulateComponent(windowComponent.groupMain.groupManipulate)));

	// Event listeners
	this.viewComponent.addEventListener(EventName.SHUTDOWN, this._handleViewEvent, this);
}

/** 
 * @override
 */
MainWindowMediator.prototype.listNotificationInterests = function() {
	return [
		EventName.SHOW_MAIN_WINDOW,
		EventName.MODEL_UPDATED
	];
}

/** 
 * @override
 */
MainWindowMediator.prototype.handleNotification = function(note) {

	switch (note.getName()) {

		case EventName.SHOW_MAIN_WINDOW:
			this._updateViewComponent();
			this.viewComponent.showWindow();
			break;

		case EventName.MODEL_UPDATED:
			this._updateViewComponent();
			break;

		default:
			//
	}
}

/** 
 * @override
 * @protected
 * @param {string} eventName
 * @param {Object} eventData
 */
MainWindowMediator.prototype._handleViewEvent = function (eventName, eventData) {
	switch (eventName) {

		case EventName.SHUTDOWN:
			this.sendNotification(eventName, eventData);
			break;

		default:
			break;
	}
}

/**
 * @override
 * @protected
 */
MainWindowMediator.prototype._updateViewComponent = function () {
	//
}

/**
 * @constant
 * @type {string}
 * @description Instance name
 */
MainWindowMediator.NAME = "MainWindowMediator";