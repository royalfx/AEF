/**
 * @constructor
 * @extends BaseViewComponent
 * @param {Object} uiContainer
 */
function ManipulateComponent(uiContainer) {
	BaseViewComponent.apply(this, [uiContainer]);
}

/**
 * @description Inheritance
 */
var Transitive = new Function;
Transitive.prototype = BaseViewComponent.prototype;
ManipulateComponent.prototype = new Transitive;
ManipulateComponent.prototype.constructor = ManipulateComponent;

/**
 * @override
 * @description Initialize component
 */
ManipulateComponent.prototype.initializeComponent = function () {
	BaseViewComponent.prototype.initializeComponent.call(this);
	
	// this._uiContainer.groupMan1.btnRLeft
	// this._uiContainer.groupMan1.btnTLeft

	// this._uiContainer.groupMan2.btnTUp
	// this._uiContainer.groupMan2.btnTDown

	// this._uiContainer.groupMan3.btnRRight
	// this._uiContainer.groupMan3.btnTRight

	
	// Declare vars
	var _this = this;
	

	this._uiContainer.groupMan1.btnRLeft.onClick = function () {
		_this._dispatchEvent(EventName.ROTATE_LEFT, {});
	}
	this._uiContainer.groupMan1.btnTLeft.onClick = function () {
		_this._dispatchEvent(EventName.MOVE_LEFT, {});
	}

	this._uiContainer.groupMan2.btnTUp.onClick = function () {
		_this._dispatchEvent(EventName.MOVE_UP, {});
	}
	this._uiContainer.groupMan2.btnTDown.onClick = function () {
		_this._dispatchEvent(EventName.MOVE_DOWN, {});
	}

	this._uiContainer.groupMan3.btnRRight.onClick = function () {
		_this._dispatchEvent(EventName.ROTATE_RIGHT, {});
	}
	this._uiContainer.groupMan3.btnTRight.onClick = function () {
		_this._dispatchEvent(EventName.MOVE_RIGHT, {});
	}
}