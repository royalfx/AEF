/**
 * @constructor
 * @class UndoManager
 */
function UndoManager() {
	if (UndoManager._instance != null) {
		throw new ErrorObject(ErrorName.SINGLETON_VIOLATION, this.constructor.name + " instance already constructed.", $.fileName, $.line);
	}
	UndoManager._instance = this;
}

/**
 * @protected
 * @type {UndoManager}
 */
UndoManager._instance = null;

/**
 * @static
 * @description The Singleton instance of UndoManager
 * @return {UndoManager}
 */
UndoManager.getInstance = function () {
	if (UndoManager._instance == null) {
		UndoManager._instance = new UndoManager();
	}
	return UndoManager._instance;
}

/**
 * @public
 * @param {string} prefix (Optional)
 */
UndoManager.prototype.initializeManager = function (prefix) {
	/*ASSERT*/AssertManager.typeString(prefix);
	if (this._initialized) {
		throw new ErrorObject(ErrorName.ALREADY_INITIALIZED, this.constructor.name + " instance already initialized.", $.fileName, $.line);
	}

	this._prefix = prefix;
	this._initialized = true;
}

/**
 * @public
 * @param {string} lockCode
 */
UndoManager.prototype.openUndoGroup = function (undoString, lockCode) {

	if (!this._initialized) {
		throw new ErrorObject(ErrorName.NOT_INITIALIZED, this.constructor.name + " not initialized.", $.fileName, $.line);
	}

	// Return if locked
	if (this.isLocked() && (lockCode != this._lockCode)) {
		return;

	// Lock
	} else if (lockCode) {
		this._lockCode = lockCode;
	}

	if (this.hasUnclosedUndoGroup()) {
		throw new ErrorObject(ErrorName.UNCLOSED_UNDO_GROUP, "Previous Undo Group not closed.", $.fileName, $.line);
	}

	if (this._prefix != null) {
		undoString = undoString.replace((this._prefix + " - "), "");
		this._currentUndoGroup = (this._prefix + " - " + undoString);
	} else {
		this._currentUndoGroup = undoString;
	}
	app.beginUndoGroup(this._currentUndoGroup);
}

/**
 * @public
 * @param {string} lockCode
 */
UndoManager.prototype.closeUndoGroup = function (lockCode) {

	if (!this._initialized) {
		throw new ErrorObject(ErrorName.NOT_INITIALIZED, this.constructor.name + " not initialized.", $.fileName, $.line);
	}


	// Return if locked
	if (this.isLocked() && (lockCode != this._lockCode)) {
		return;

	// Unlock
	} else if (lockCode) {
		this._lockCode = null;
	}

	if (!this.hasUnclosedUndoGroup()) {
		throw new ErrorObject(ErrorName.NO_UNDO_GROUP, "Attempt to close nonexistent Undo Group.", $.fileName, $.line);
	}
	app.endUndoGroup();
	this._currentUndoGroup = null;
}

/**
 * @public
 */
UndoManager.prototype.reset = function () {

	if (!this._initialized) {
		throw new ErrorObject(ErrorName.NOT_INITIALIZED, this.constructor.name + " not initialized.", $.fileName, $.line);
	}

	this._lockCode = null;
	this._currentUndoGroup = null;
	app.endUndoGroup();
}

/**
 * @public
 * @returns {boolean}
 */
UndoManager.prototype.hasUnclosedUndoGroup = function () {
	return (this._currentUndoGroup != null);
}

/**
 * @public
 * @returns {string}
 */
UndoManager.prototype.getUnclosedUndoGroup = function () {
	return this._currentUndoGroup;
}

/**
 * @public
 * @returns {boolean}
 */
UndoManager.prototype.isLocked = function () {
	return this._lockCode != null;
}

/**
 * @public
 * @returns {boolean}
 */
UndoManager.prototype.isInitialized = function () {
	return (this._initialized === true);
}

/**
 * @protected
 * @type {string}
 */
UndoManager.prototype._currentUndoGroup = null;

/**
 * @protected
 * @type {string}
 */
UndoManager.prototype._lockCode = null;

/**
 * @protected
 * @type {boolean}
 */
UndoManager.prototype._initialized = null;