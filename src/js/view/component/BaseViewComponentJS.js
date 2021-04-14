/**
 * @constructor
 * @class BaseViewComponentJS
 * @extends BaseEventTarget
 */
function BaseViewComponentJS() {
	BaseEventTarget.call(this);
}

/**
 * @description Inheritance
 */
BaseViewComponentJS.prototype = new BaseEventTarget;
BaseViewComponentJS.prototype.constructor = BaseViewComponentJS;

/**
 * @public
 */
BaseViewComponentJS.prototype.initializeComponent = function () {
	//
}