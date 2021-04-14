/**
 * @constructor
 * @class ImagesManager
 */
function ImagesManager() {
	if(ImagesManager._instance != null) {
		throw new ErrorObject(ErrorName.SINGLETON_VIOLATION, this.constructor.name + " instance already constructed.", $.fileName, $.line);
	}
	ImagesManager._instance = this;
	this._initialized = false;
}

/**
 * @protected
 * @type {ImagesManager}
 */
ImagesManager._instance = null;

/**
 * @static
 * @description The Singleton instance of ImagesManager
 * @return {ImagesManager}
 */
ImagesManager.getInstance = function() {
	if (ImagesManager._instance == null) {
		ImagesManager._instance = new ImagesManager();
	}
	return ImagesManager._instance;
}

/**
 * @public
 * @param {Object} imagesData
 * @param {Folder} assetsDir
 */
ImagesManager.prototype.initializeManager = function (imagesData, assetsDir, rewriteFiles) {
	/*ASSERT*/AssertManager.typeObject(imagesData);
	/*ASSERT*/AssertManager.instanceOf(assetsDir, Folder);
	if (this._initialized) {
		throw new ErrorObject(ErrorName.ALREADY_INITIALIZED, this.constructor.name + " instance already initialized.", $.fileName, $.line);
	}

	this._imagesMap = {};
	this._imagesData = imagesData;
	this._imagesDir = Folder(assetsDir.fsName + "/images");
	if (!this._imagesDir.exists) {
		this._imagesDir.create();
	}
	this._rewriteFiles = rewriteFiles;
	this._initialized = true;
}

/**
 * @public
 * @param {string} fileName
 * @returns {ScriptUIImage}
 */
ImagesManager.prototype.getUIImage = function(fileName) {
	if (!this._initialized) {
		throw new ErrorObject(ErrorName.NOT_INITIALIZED, this.constructor.name + " is not initialized.", $.fileName, $.line);
	}
	if(this._imagesMap[fileName] === undefined) {
		var fileImage = this.getImageFile(fileName);
		if (fileImage != null) {
			this._imagesMap[fileName] = ScriptUI.newImage(fileImage);
		} else {
			return null;
		}
	}
	return this._imagesMap[fileName];
}

/**
 * @public
 * @param {string} fileName
 * @returns {File}
 */
ImagesManager.prototype.getImageFile = function (fileName) {
	if (!this._initialized) {
		throw new ErrorObject(ErrorName.NOT_INITIALIZED, this.constructor.name + " is not initialized.", $.fileName, $.line);
	}
	var fileImage = File(this._imagesDir.fsName + "/" + fileName);
	if (!fileImage.exists || this._rewriteFiles) {
		var binary = this._imagesData[fileName];
		if (binary != null) {
			fileImage = as_fileWrite(fileImage, binary, true);
		} else {
			return null;
		}
	}
	return fileImage;
}

/**
 * @public
 * @returns {Object}
 */
ImagesManager.prototype.getImagesData = function () {
	if (!this._initialized) {
		throw new ErrorObject(ErrorName.NOT_INITIALIZED, this.constructor.name + " is not initialized.", $.fileName, $.line);
	}
	return this._imagesData;
}

/**
 * @public
 * @returns {Folder}
 */
ImagesManager.prototype.getImagesDir = function () {
	if (!this._initialized) {
		throw new ErrorObject(ErrorName.NOT_INITIALIZED, this.constructor.name + " is not initialized.", $.fileName, $.line);
	}
	return this._imagesDir;
}

/**
 * @public
 * @returns {boolean}
 */
ImagesManager.prototype.isInitialized = function () {
	return this._initialized == true;
}

/**
 * @protected
 * @type {Object}
 */
ImagesManager.prototype._imagesData = null;

/**
 * @protected
 * @type {Folder}
 */
ImagesManager.prototype._imagesDir = null;

/**
 * @protected
 * @type {Object}
 */
ImagesManager.prototype._imagesMap = null;

/**
 * @protected
 * @type {boolean}
 */
ImagesManager.prototype._rewriteFiles = null;

/**
 * @protected
 * @type {boolean}
 */
ImagesManager.prototype._initialized = null;