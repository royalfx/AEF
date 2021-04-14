/**
 * @constructor
 * @class BaseESProxy
 * @extends puremvc.Proxy
 * @description ExtendScript Proxy
 */
function BaseESProxy() {
    puremvc.Proxy.apply(this, [ProxyName.ES]);
}

/**
 * @description Inheritance
 */
BaseESProxy.prototype = new puremvc.Proxy;
BaseESProxy.prototype.constructor = BaseESProxy;

/**
 * @public
 * @override
 */
BaseESProxy.prototype.onRegister = function () {
	puremvc.Proxy.prototype.onRegister.apply(this, []);

	// Create CS Interface
	this._csInterface = new CSInterface();

	// Add event listener to ExtendScript
	var _this = this;
	this._csInterface.addEventListener(ESEventName.NOTIFICATION, function (event) {
		try {

			// alert(event.data);
			// alert(typeof event.data);
			// /*LOGGER*/Logger.log("CSInterface > ESEventName.NOTIFICATION > event.data", event.data);

			var args = event.data;
			args[3] = true; // fromES
			// alert(args);
			// /*LOGGER*/Logger.log("CSInterface > ESEventName.NOTIFICATION > event.data", args);

			_this.facade.sendNotification.apply(_this.facade, args);

		} catch (error) {
			alert(error);
		}
	});
}

/**
 * @public
 * @param {string} facadeKey
 * @param {string} notificationName
 * @param {*} body
 * @param {string} type
 */
BaseESProxy.prototype.sendNotification = function (facadeKey, notificationName, body, type) {
	var extendScript = "Facade.getInstance(" + JSON.stringify(facadeKey) + ").sendNotification(" + JSON.stringify(notificationName) + ", " + JSON.stringify(body) + ", " + JSON.stringify(type) + ", true);";
	return this._callES(extendScript);
}

/**
 * @public
 * @param {string} facadeKey
 * @param {string} proxyName
 * @param {string} methodName
 * @param {Array} methodArguments
 */
BaseESProxy.prototype.callESProxy = function (facadeKey, proxyName, methodName, methodArguments) {
	if (methodArguments === undefined) {
		methodArguments = [];
	}
	var extendScript = "var proxy Facade.getInstance(" + JSON.stringify(facadeKey) + ").retrieveProxy(" + JSON.stringify(proxyName) + ")";
	extendScript = extendScript + "proxy[" + JSON.stringify(methodName) + "].apply(proxy, " + JSON.stringify(methodArguments) + ", true)";
	return this._callES(extendScript);
}

/**
 * @protected
 * @param {string} extendScript
 * @returns {Promise}
 */
BaseESProxy.prototype._callES = function (extendScript) {
	// alert("BaseESProxy._callES : " + extendScript);
	// /*LOGGER*/Logger.log("BaseESProxy._callES > extendScript", extendScript);

	var _this = this;
	var promise = new Promise(function (resolve, reject) {
		_this._csInterface.evalScript(extendScript, function (response) {
			// alert("BaseESProxy._callES > resieve response : " + JSON.stringify(response));
			// /*LOGGER*/Logger.log("BaseESProxy._callES > response", response);
			if (response instanceof Error) {
				// Error
				/*DEVELOP*/alert(response);
				reject(response);
			} else {
				// Succes
				var data = response;
				resolve(data);
			}
		});
	});
	return promise;
}

/**
 * @public
 * @returns CSInterface
 */
BaseESProxy.prototype.getCSInterface = function() {
	return this._csInterface;
}

/**
 * @protected
 * @type {CSInterface}
 */
BaseESProxy.prototype._csInterface = null;