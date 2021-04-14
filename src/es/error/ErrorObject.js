/**
 * @constructor
 * @class ErrorObject
 * @param {string} name
 * @param {string} message (Optional)
 * @param {File} file (Optional)
 * @param {number} line (Optional)
 */
function ErrorObject(name, message, file, line) {
	/*ASSERT*/AssertManager.typeString(name);
	this.name = name;
	this.file = file;
	this.line = line;
	this.message = message;
}

ErrorObject.prototype.toString = function () {
	var str = "Error " + this.name;
	if (this.line) {
		str = str + " at line " + this.line;
	}
	if (this.file) {
		str = str + " in file " + this.file;
	}
	str = str + "\nmessage: " + this.message;
	return str;
}

/**
 * @public
 * @type {string}
 */
ErrorObject.prototype.name = null;

/**
 * @public
 * @type {string}
 */
ErrorObject.prototype.message = null;

/**
 * @public
 * @type {File}
 */
ErrorObject.prototype.file = null;

/**
 * @public
 * @type {number}
 */
ErrorObject.prototype.line = null;