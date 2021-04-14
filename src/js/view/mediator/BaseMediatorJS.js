/**
 * @constructor
 * @class BaseMediatorJS
 * @extends puremvc.Mediator
 * @param {string} mediatorName
 * @param {*} viewComponent
 */
function BaseMediatorJS(mediatorName, viewComponent) {
    puremvc.Mediator.apply(this, [mediatorName, viewComponent]);
}

/**
 * @description Inheritance
 */
BaseMediatorJS.prototype = new puremvc.Mediator;
BaseMediatorJS.prototype.constructor = BaseMediatorJS;

/** 
 * @protected
 * @param {string} eventName
 * @param {Object} eventData
 */
BaseMediatorJS.prototype._handleViewEvent = function (eventName, eventData) {
	// OVERRIDE
	throw new ErrorObject(ErrorName.NOT_IMPLEMENTED_INTERFACE, "Not Implemented Interface.");
}

/**
 * @protected
 */
BaseMediatorJS.prototype._updateViewComponent = function () {
	// OVERRIDE
	throw new ErrorObject(ErrorName.NOT_IMPLEMENTED_INTERFACE, "Not Implemented Interface.");
}