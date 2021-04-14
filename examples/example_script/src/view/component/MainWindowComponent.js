/**
 * @constructor
 * @class MainWindowComponent
 * @extends BaseWindowComponent
 * @param {Object} winObj 
 * @param {Object} uiData
 */
function MainWindowComponent(winObj, uiData) {

	// Create window
	var win;
	if (winObj instanceof Panel) {
		win = winObj;
		this._isPanel = true;
	} else {
		win = new Window("palette", "Example Script", undefined, {
			name: "winExampleScript",
			resizeable: true
		});
		this._isPanel = false;
	}
	win.margins = [6, 6, 6, 6];
	win.alignment = ["left", "top"];
	win.alignChildren = ["left", "top"];

	// Call parent constructor
	BaseWindowComponent.apply(this, [win, uiData]);
}

/**
 * @description Inheritance
 */
var Transitive = new Function;
Transitive.prototype = BaseWindowComponent.prototype;
MainWindowComponent.prototype = new Transitive;
MainWindowComponent.prototype.constructor = MainWindowComponent;

/**
 * @override
 * @description Initialize component
 */
MainWindowComponent.prototype.initializeComponent = function () {
	BaseWindowComponent.prototype.initializeComponent.call(this);
	
	// Declare vars
	var _this = this;

	// Mouseover event
	if (this._isPanel) {

		// If panel
		this._uiContainer.addEventListener("mouseover", function (event) {
			if (event.target == _this._uiContainer.groupMain) {
				_this._dispatchEvent(EventName.SYNC_AE, {});
			}
		}, false);

	} else {

		// If window
		this._uiContainer.addEventListener("mouseover", function (event) {
			if ((event.target == _this._uiContainer.groupMain) /* && !_this._isWinActive */) {
				if (!_this._stopFocusHandling) {
					_this._dispatchEvent(EventName.SYNC_AE, {});
				}
			}
		}, false);
	}

	// onClose
	this._uiContainer.onClose = function () {
		_this._dispatchEvent(EventName.SHUTDOWN, {});
	}
}