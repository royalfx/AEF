/**
 * @constructor
 * @class StaticFileProxy
 * @extends Proxy
 * @param {string} proxyName
 * @param {File} file
 */
function StaticFileProxy(file, proxyName) {
	/*ASSERT*/AssertManager.instanceOf(file, File);
	
	this._file = file;
	Proxy.apply(this, [proxyName || ProxyName.FILE]);
}

/**
 * @description Inheritance
 */
StaticFileProxy.prototype = new Proxy;
StaticFileProxy.prototype.constructor = StaticFileProxy;

/**
 * @override
 * @public
 */
StaticFileProxy.prototype.onRegister = function () {
	this._readFile();
}

/**
 * @override
 * @public
 */
StaticFileProxy.prototype.onRemove = function () {
	this._file = null;
	this._fileData = null;
}

/**
 * @public
 * @returns {boolean} True if file updated
 */
StaticFileProxy.prototype.checkFileUpdated = function () {
	if (!this._file.exists) {
		this._fileData = null;
		this._fileModifiedTime = null;
		return false;
	}
	var modified = (this._file.modified.getTime() != this._fileModifiedTime);
	if (modified === true) {
		this._readFile();
		return true;
	}
	return false;
}

/**
 * @public
 * @returns {Object}
 */
StaticFileProxy.prototype.getFileData = function () {
	return this._fileData;
}

/**
 * @public
 * @returns {string}
 */
StaticFileProxy.prototype.getFileName = function () {
	return as_getFileName(this._file);
}

/**
 * @public
 * @returns {File}
 */
StaticFileProxy.prototype.getFile = function () {
	return this._file;
}

/**
 * @protected
 */
StaticFileProxy.prototype._readFile = function () {
	if (this._file.exists) {
		if (("." + as_getFileExtension(this._file)) === FileExtension.JSXINC) {
			this._fileData = as_fileReadJSBinary(this._file);
		} else {
			this._fileData = as_fileReadJSON(this._file);
		}
		this._fileModifiedTime = this._file.modified.getTime();
	} else {
		this._fileData = null;
		this._fileModifiedTime = null;
	}
}

/**
 * @protected
 * @type {File}
 */
StaticFileProxy.prototype._file = null;

/**
 * @protected
 * @type {Object}
 */
StaticFileProxy.prototype._fileData = null;

/**
 * @protected
 * @type {number}
 */
StaticFileProxy.prototype._fileModifiedTime = null;