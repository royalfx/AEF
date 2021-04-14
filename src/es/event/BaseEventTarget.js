/**
 * @constructor
 * @class BaseEventTarget
 */
function BaseEventTarget() {
	this._listenersMap = {};
}

/**
 * @public
 * @param {string} eventName
 * @param {Function} listenerMethod
 * @param {Object} listenerContext
 */
BaseEventTarget.prototype.addEventListener = function (eventName, listenerMethod, listenerContext) {
	/*ASSERT*/AssertManager.typeString(eventName);
	/*ASSERT*/AssertManager.typeFunction(listenerMethod);
	/*ASSERT*/AssertManager.significant(listenerContext);

	var listener = new EventListener(listenerMethod, listenerContext);
	if (this._listenersMap[eventName] != null) {
		this._listenersMap[eventName].push(listener);
	} else {
		this._listenersMap[eventName] = [listener];
	}
}

/**
 * @public
 * @param {string} eventName
 * @param {Function} listenerMethod
 * @returns {boolean} True if successfully removed
 */
BaseEventTarget.prototype.removeEventListener = function (eventName, listenerMethod) {
	/*ASSERT*/AssertManager.typeString(eventName);
	/*ASSERT*/AssertManager.typeFunction(listenerMethod);

	if (this._listenersMap[eventName]) {
		for (var i = 0, listener; i < this._listenersMap[eventName].length; i++) {
			listener = this._listenersMap[eventName][i];
			if (listener.getListenerMethod() == listenerMethod) {
				this._listenersMap[eventName].slice(i, 1);
				return true;
			}
		}
	}
	return false;
}

/**
 * @public
 */
BaseEventTarget.prototype.removeAllEventListeners = function () {
	for (var eventName in this._listenersMap) {
		if (this._listenersMap.hasOwnProperty(eventName)) {
			for (var i = 0; i < this._listenersMap[eventName].length; i++) {
				delete this._listenersMap[eventName][i];
			}
		}
	}
}

/**
 * @protected
 * @param {string} eventName
 * @param {*} eventData
 */
BaseEventTarget.prototype._dispatchEvent = function (eventName, eventData) {
	/*ASSERT*/AssertManager.typeString(eventName);
	// alert("BaseEventTarget.prototype._dispatchEvent > " + eventName);

	if (this._listenersMap[eventName] != null) {
		var listenersList = this._listenersMap[eventName];
		for (var i = 0, listener; i < listenersList.length; i++) {
			listener = listenersList[i];
			listener.notifyListener(eventName, eventData);
		}
	}
}

/**
 * @protected
 * @type {Object}
 */
BaseEventTarget.prototype._listenersMap = null;