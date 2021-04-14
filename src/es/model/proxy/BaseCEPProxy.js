/**
 * @constructor
 * @class BaseCEPProxy
 * @extends Proxy
 * @description CEP Proxy
 */
function BaseCEPProxy() {
    Proxy.apply(this, [ProxyName.CEP]);
}

/**
 * @description Inheritance
 */
BaseCEPProxy.prototype = new Proxy;
BaseCEPProxy.prototype.constructor = BaseCEPProxy;

/**
 * @public
 * @override
 */
BaseCEPProxy.prototype.onRegister = function () {
    // Create ExternalObject
    try {
        var eoName;
        if (Folder.fs === 'Macintosh') {
            eoName = "PlugPlugExternalObject";
        } else {
            eoName = "PlugPlugExternalObject.dll";
        }
        this._externalLib = new ExternalObject('lib:' + eoName);
    } catch (err) {
        alert("Missing ExternalObject! Error: " + err.message);
    }
    // var xLib = new ExternalObject("lib:\\PlugPlugExternalObject");
}

/**
 * @public
 * @param {string} notificationName
 * @param {*} body
 * @param {string} type
 */
BaseCEPProxy.prototype.sendNotification = function (notificationName, body, type) {
    var eventObj = new CSXSEvent();
    eventObj.type = ESEventName.NOTIFICATION;
    // CSXSEvent converts for some reason data from string to object and object to string ...
    eventObj.data = JSON.stringify([notificationName, body, type]);
	eventObj.dispatch();
    // alert("CSXSEvent Sent!");
}

/**
 * @protected
 * @type {ExternalObject}
 */
BaseCEPProxy.prototype._externalLib = null;