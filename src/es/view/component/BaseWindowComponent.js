/**
 * @constructor
 * @class BaseWindowComponent
 * @extends BaseViewComponent
 * @param {*} window
 * @param {Object} uiData
 */
function BaseWindowComponent(window, uiData) {
	/*ASSERT*/AssertManager.typeObject(uiData);
	this._uiData = uiData;
	BaseViewComponent.apply(this, [window]);
}

/**
 * @description Inheritance
 */
var Transitive = new Function;
Transitive.prototype = BaseViewComponent.prototype;
BaseWindowComponent.prototype = new Transitive;
BaseWindowComponent.prototype.constructor = BaseWindowComponent;

/**
 * @override
 * @param {boolean} enabled
 */
BaseWindowComponent.prototype.setEnabled = function (enabled) {
	// OVERRIDE
	throw new ErrorObject(ErrorName.NOT_IMPLEMENTED_INTERFACE, "Not Implemented Interface.");

}

/**
 * @override
 */
BaseWindowComponent.prototype.initializeComponent = function () {
	// /*PROFILER*/ProfilerGlobal.step("BaseWindowComponent.initializeComponent start");

	BaseViewComponent.prototype.initializeComponent.call(this);
	// /*PROFILER*/ProfilerGlobal.step("BaseWindowComponent.initializeComponent call parent");

	var imagesManager = ImagesManager.getInstance();
	if (imagesManager.isInitialized()) {
		as_uiCreateFromData(this._uiContainer, this._uiData, imagesManager.getImagesData(), imagesManager.getImagesDir(), /* this.rewriteAppDataFiles */ true);
	} else {
		as_uiCreateFromData(this._uiContainer, this._uiData, undefined, undefined, /* this.rewriteAppDataFiles */ true);
	}
	// /*PROFILER*/ProfilerGlobal.step("BaseWindowComponent.initializeComponent > as_uiCreateFromData");

	delete this._uiData;

	var _this = this;

	// onActivate
	this._uiContainer.onActivate = function () {
		_this._isWinActive = true;
	}

	// onDeactivate
	this._uiContainer.onDeactivate = function () {
		_this._isWinActive = false;
	}

	// OVERRIDE

	// /*PROFILER*/ProfilerGlobal.step("BaseWindowComponent.initializeComponent end");
}

/**
 * @public
 */
BaseWindowComponent.prototype.showWindow = function() {
	if (this._isPanel) {
		this._uiContainer.layout.layout(true);
	} else {
		this._uiContainer.center();
		this._uiContainer.show();
	}
}

/**
 * @public
 */
BaseWindowComponent.prototype.hideWindow = function() {
	this._uiContainer.hide();
}

/**
 * @public
 * @returns {boolean}
 */
BaseWindowComponent.prototype.isPanel = function() {
	return this._isPanel;
}

/**
 * @public
 * @returns {boolean}
 */
BaseWindowComponent.prototype.isWinActive = function() {
	return this._isWinActive;
}

/**
 * @protected
 * @type boolean
 */
BaseWindowComponent.prototype._isPanel = false;

/**
 * @protected
 * @type boolean
 */
BaseWindowComponent.prototype._isWinActive = false;

/**
 * @protected
 * @type {Object}
 */
BaseWindowComponent.prototype._uiData = null;