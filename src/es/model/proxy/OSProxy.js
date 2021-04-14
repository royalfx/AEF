/**
 * @constructor
 * @class OSProxy
 * @extends Proxy
 * @param {string} scriptFolderName
 * @param {string} versionFolderName
 */
function OSProxy(scriptFolderName, versionFolderName) {
	this._scriptFolderName = scriptFolderName;
	this._versionFolderName = versionFolderName;
	Proxy.apply(this, [ProxyName.OS]);
}

/**
 * @description Inheritance
 */
OSProxy.prototype = new Proxy;
OSProxy.prototype.constructor = OSProxy;

// /**
//  * @description Get user data directory
//  * @returns {Folder}
//  */
// OSProxy.prototype.getPrefsDirectory = function () {
// 	return as_getUserDataFolder(this._scriptFolderName, this._versionFolderName);
// }

/**
 * @description Get assets directory
 * @returns {Folder}
 */
OSProxy.prototype.getAssetsDirectory = function () {
	return as_getTempFolder(this._scriptFolderName, this._versionFolderName);
}

/**
 * @protected
 * @type {File}
 */
OSProxy.prototype._latestSelectedFile = null;

/**
 * @protected
 * @type {string}
 */
OSProxy.prototype._scriptFolderName = null;

/**
 * @protected
 * @type {string}
 */
OSProxy.prototype._versionFolderName = null;