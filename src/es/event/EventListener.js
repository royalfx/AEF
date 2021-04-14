/**
 * @constructor
 * @class EventListener
 * @param {Function} listenerMethod 
 * @param {*} listenerContext
 * @description Observer pattern implementation
 */
function EventListener(listenerMethod, listenerContext) {
	/*ASSERT*/AssertManager.instanceOf(listenerMethod, Function);
	/*ASSERT*/AssertManager.instanceOf(listenerContext, Object);

	this.setListenerMethod(listenerMethod);
	this.setListenerContext(listenerContext);
}

/**
 * @public
 * @param {Function} listenerMethod
 */
EventListener.prototype.setListenerMethod = function (listenerMethod) {
	/*ASSERT*/AssertManager.typeFunction(listenerMethod);
	this._listenerMethod = listenerMethod;
}

/**
 * @public
 * @param {*} listenerContext
 */
EventListener.prototype.setListenerContext = function (listenerContext) {
	/*ASSERT*/AssertManager.significant(listenerContext);
	this._listenerContext = listenerContext;
}

/**
 * @public
 * @return {Function}
 */
EventListener.prototype.getListenerMethod = function() {
	return this._listenerMethod;
}

/**
 * @public
 * @return {*}
 */
EventListener.prototype.getListenerContext = function() {
	return this._listenerContext;
}

/**
 * @public
 * @param {*} eventData
 */
EventListener.prototype.notifyListener = function (eventName, eventData) {
	/*ASSERT*/AssertManager.typeString(eventName);
	this._listenerMethod.apply(this._listenerContext, [eventName, eventData]);
}

/**
 * @protected
 * @type {Function}
 */
EventListener.prototype._listenerMethod = null;

/**
 * @protected
 * @type {Object}
 */
EventListener.prototype._listenerContext = null;