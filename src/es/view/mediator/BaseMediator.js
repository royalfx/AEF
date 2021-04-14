/**
 * @constructor
 * @class BaseMediator
 * @extends Mediator
 * @param {string} mediatorName
 * @param {*} viewComponent
 */
function BaseMediator(mediatorName, viewComponent) {
	/*ASSERT*/AssertManager.typeString(mediatorName);
	/*ASSERT*/AssertManager.instanceOf(viewComponent, BaseViewComponent);
	Mediator.apply(this, [mediatorName, viewComponent]);
}

/**
 * @description Inheritance
 */
BaseMediator.prototype = new Mediator;
BaseMediator.prototype.constructor = BaseMediator;

/** 
 * @protected
 * @param {string} eventName
 * @param {Object} eventData
 */
BaseMediator.prototype._handleViewEvent = function (eventName, eventData) {
	// OVERRIDE
	throw new ErrorObject(ErrorName.NOT_IMPLEMENTED_INTERFACE, "Not Implemented Interface.");
}

/**
 * @protected
 */
BaseMediator.prototype._updateViewComponent = function () {
	// OVERRIDE
	throw new ErrorObject(ErrorName.NOT_IMPLEMENTED_INTERFACE, "Not Implemented Interface.");
}