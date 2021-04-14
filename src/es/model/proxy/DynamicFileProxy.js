/**
 * @constructor
 * @class DynamicFileProxy
 * @extends StaticFileProxy
 * @param {string} proxyName
 * @param {File} file
 */
function DynamicFileProxy(file, proxyName, prettyJSON, saveBackup) {
	/*ASSERT*/AssertManager.instanceOf(file, File);
	
	this._file = file;
	this._prettyJSON = (prettyJSON === true);
	this._saveBackup = (saveBackup === true);

	StaticFileProxy.apply(this, [file, proxyName]);
}

/**
 * @description Inheritance
 */
var Transitive = new Function;
Transitive.prototype = StaticFileProxy.prototype;
DynamicFileProxy.prototype = new Transitive;
DynamicFileProxy.prototype.constructor = DynamicFileProxy;

/**
 * @public
 * @returns {boolean} True if file data updated
 */
DynamicFileProxy.prototype.checkUnsavedData = function () {
	var currentHash = StringTools.hashFunc(JSON.stringify(this._fileData));
	if (this._fileDataHash != currentHash) {
		this._writeFile(currentHash);
		return true;
	}
	return false;
}

/**
 * @public
 * @param {string} newFileName
 * @returns {boolean} True if data updated
 */
DynamicFileProxy.prototype.renameFile = function (newFileName) {
	/*ASSERT*/AssertManager.typeString(newFileName);
	if (this._file.exists) {
		return this._file.rename(newFileName);
	}
	return null;
}

/**
 * @public
 * @returns {Object}
 */
DynamicFileProxy.prototype.getFileData = function () {
	return this._fileData;
}

/**
 * @public
 * @returns {string}
 */
DynamicFileProxy.prototype.getFileName = function () {
	return as_getFileName(this._file);
}

/**
 * @public
 * @returns {File}
 */
DynamicFileProxy.prototype.getFile = function () {
	return this._file;
}

/**
 * @protected
 */
DynamicFileProxy.prototype._readFile = function () {
	if (this._file.exists) {
		// /*PROFILER*/var profiler = new Profiler("DynamicFileProxy.prototype._readFile");
		if (("." + as_getFileExtension(this._file)) === FileExtension.JSXINC) {
			this._fileData = as_fileReadJSBinary(this._file);
		} else {
			this._fileData = as_fileReadJSON(this._file);
		}
		// /*PROFILER*/profiler.step("Read file " + this._file.displayName);
		// /*PROFILER*/profiler.show();
		this._fileModifiedTime = this._file.modified.getTime();
		this._fileDataHash = StringTools.hashFunc(JSON.stringify(this._fileData));
	} else {
		this._fileData = null;
		this._fileModifiedTime = null;
		this._fileDataHash = null;
	}
}

/**
 * @protected
 * @param {string} currentHash
 */
DynamicFileProxy.prototype._writeFile = function (currentHash) {
	if (this._fileData != null) {
		if (("." + as_getFileExtension(this._file)) === FileExtension.JSXINC) {
			as_fileWriteJSBinary(this._file, this._fileData, (this._prettyJSON ? "\t" : undefined), this._saveBackup);
		} else {
			as_fileWriteJSON(this._file, this._fileData, (this._prettyJSON ? "\t" : undefined), this._saveBackup);
		}
		this._fileModifiedTime = this._file.modified.getTime();
		this._fileDataHash = currentHash;
	} else {
		this._fileModifiedTime = null;
		this._fileDataHash = null;
	}
}

/**
 * @protected
 * @type {File}
 */
DynamicFileProxy.prototype._file = null;

/**
 * @protected
 * @type {Object}
 */
DynamicFileProxy.prototype._fileData = null;

/**
 * @protected
 * @type {string}
 */
DynamicFileProxy.prototype._fileDataHash = null;

/**
 * @protected
 * @type {boolean}
 */
DynamicFileProxy.prototype._saveBackup = null;

/**
 * @protected
 * @type {boolean}
 */
DynamicFileProxy.prototype._prettyJSON = null;