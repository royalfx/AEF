/**
 * @constructor
 * @class CommandCenter
 * @extends Proxy
 * @description Collects data on the execution of many commands.
 */
function CommandCenter() {
	Proxy.apply(this, [ProxyName.COMMAND_CENTER]);
}

/**
 * @description Inheritance
 */
CommandCenter.prototype = new Proxy;
CommandCenter.prototype.constructor = CommandCenter;

/**
 * @public
 * @param {SimpleCommand} command
 */
CommandCenter.prototype.initializeCommand = function (command) {
	/*ASSERT*/AssertManager.instanceOf(command, SimpleCommand);

	if (this._initialized) {
		throw new ErrorObject(ErrorName.ALREADY_INITIALIZED, "CommandCenter already initialized. Call completeCommand() to complete current command.");
	}

	this._initialized = true;
	this._updatesMap = {};
	this._updatedFiles = [];
	this._primaryCommand = command;
}

/**
 * @public
 * @param {boolean} silent
 */
CommandCenter.prototype.completeCommand = function (silent) {

	if (!this._initialized) {
		throw new ErrorObject(ErrorName.NOT_INITIALIZED, "CommandCenter not initialized.");
	}

	// Success
	if (this._successful) {
		if (this._successMessage && !silent) {
			alert(this._successMessage);
		}

	// Fail
	} else if (this._failed) {
		if (this._failMessage && !silent) {
			alert(this._failMessage);
		}

	// Error
	} else if (this._error) {
		if (this._errorMessage && !silent) {
			alert(this._errorMessage);
		}
	}

	// Files
	for (var i = 0, proxy; i < this._updatedFiles.length; i++) {
		proxy = this.facade.retrieveProxy(this._updatedFiles[i]);
		if (proxy && (proxy instanceof DynamicFileProxy)) {
			proxy.checkUnsavedData();
		} else {
			/*DEVELOP*/alert("Error. Invalid proxy : \"" + this._updatedFiles[i] + "\".");
		}
	}

	// Updates
	for (var notificationName in this._updatesMap) {
		if (this._updatesMap.hasOwnProperty(notificationName)) {
			var scope = this._updatesMap[notificationName];
			this.facade.sendNotification(notificationName, scope);
		}
	}

	// Reset
	this.resetAllResults();
	this._primaryCommand = null;
	this._initialized = false;
}

/**
 * @public
 * @param {string} message
 */
CommandCenter.prototype.setSuccessful = function (message) {

	if (!this._initialized) {
		throw new ErrorObject(ErrorName.NOT_INITIALIZED, "CommandCenter not initialized.");
	}

	this._successful = true;
	this._failed = false;
	this._error = null;
	if (typeof message === "string") {
		this._successMessage = message;
	}
}

/**
 * @public
 * @param {string} message
 */
CommandCenter.prototype.setFailed = function (message) {

	if (!this._initialized) {
		throw new ErrorObject(ErrorName.NOT_INITIALIZED, "CommandCenter not initialized.");
	}

	this._failed = true;
	this._successful = false;
	if (typeof message === "string") {
		this._failMessage = message;
	}
}

/**
 * @public
 * @param {ErrorObject} error
 * @param {string} message
 */
CommandCenter.prototype.setError = function (error, message) {

	if (!this._initialized) {
		throw new ErrorObject(ErrorName.NOT_INITIALIZED, "CommandCenter not initialized.");
	}

	/*ASSERT*/AssertManager.instanceOf(error, ErrorObject);
	this._error = error;
	this._successful = false;
	if (typeof message === "string") {
		this._errorMessage = message;
	}
}

/**
 * @public
 * @param {string} notificationName
 * @param {*} scope string or array
 */
CommandCenter.prototype.setUpdates = function (notificationName, scope) {
	/*ASSERT*/AssertManager.typeString(notificationName);

	if (!this._initialized) {
		throw new ErrorObject(ErrorName.NOT_INITIALIZED, "CommandCenter not initialized.");
	}

	var noteScope = this._updatesMap[notificationName];
	if (!noteScope) {
		noteScope = this._updatesMap[notificationName] = [];
	}
	if (typeof scope === "string") {
		if (as_arrayCheckValue(scope, noteScope) < 0) {
			noteScope.push(scope);
		}
	} else if (scope instanceof Array) {
		for (var i = 0; i < scope.length; i++) {
			if (as_arrayCheckValue(scope[i], noteScope) < 0) {
				noteScope.push(scope[i]);
			}
		}
	}
}

/**
 * @public
 * @param {string} proxyName
 */
CommandCenter.prototype.setFileUpdated = function (proxyName) {
	if (as_arrayCheckValue(proxyName, this._updatedFiles) == -1) {
		this._updatedFiles.push(proxyName);
	}
}

/**
 * @public
 */
CommandCenter.prototype.resetAllResults = function () {

	if (!this._initialized) {
		throw new ErrorObject(ErrorName.NOT_INITIALIZED, "CommandCenter not initialized.");
	}

	this._successful = null;
	this._successMessage = null;
	this._failed = null;
	this._failMessage = null;
	this._error = null;
	this._errorMessage = null;
	this._updatesMap = {};
	this._updatedFiles = [];
}

/**
 * @public
 * @returns {boolean}
 */
CommandCenter.prototype.isSuccessful = function () {
	return (this._successful === true);
}

/**
 * @public
 * @returns {boolean}
 */
CommandCenter.prototype.isFailed = function () {
	return (this._failed === true);
}

/**
 * @public
 * @returns {boolean}
 */
CommandCenter.prototype.hasError = function () {
	return (this._error != null);
}

/**
 * @public
 * @returns {boolean}
 */
CommandCenter.prototype.isInitialized = function () {
	return (this._initialized === true);
}

/**
 * @public
 * @param {SimpleCommand} command
 * @returns {boolean}
 */
CommandCenter.prototype.isPrimaryCommand = function (command) {
	return this._primaryCommand == command;
}

/**
 * @protected
 * @type {boolean}
 */
CommandCenter.prototype._successful = null;

/**
 * @protected
 * @type {string}
 */
CommandCenter.prototype._successMessage = null;

/**
 * @protected
 * @type {boolean}
 */
CommandCenter.prototype._failed = null;

/**
 * @protected
 * @type {string}
 */
CommandCenter.prototype._failMessage = null;

/**
 * @protected
 * @type {ErrorObject}
 */
CommandCenter.prototype._error = null;

/**
 * @protected
 * @type {string}
 */
CommandCenter.prototype._errorMessage = null;

/**
 * @protected
 * @type {Array}
 */
CommandCenter.prototype._updatesMap = null;

/**
 * @protected
 * @type {SimpleCommand}
 */
CommandCenter.prototype._primaryCommand = null;

/**
 * @protected
 * @type {boolean}
 */
CommandCenter.prototype._initialized = null;

/**
 * @protected
 * @type {Array} [string]
 */
CommandCenter.prototype._updatedFiles = null;