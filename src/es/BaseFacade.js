/**
 * @constructor
 * @class BaseFacade
 * @extends Facade
 * @param {string} key The multiton key to use to retrieve the Facade instance.
 */
function BaseFacade(key) {
	/*ASSERT*/AssertManager.typeString(key);
	Facade.apply(this, [key]);
}

/**
 * @description Inheritance
 */
var Transitive = new Function;
Transitive.prototype = Facade.prototype;
BaseFacade.prototype = new Transitive;
BaseFacade.prototype.constructor = BaseFacade;

/**
 * @public
 * @returns {string}
 */
BaseFacade.prototype.getScriptName = function () {
	// OVERRIDE
	throw new ErrorObject(ErrorName.NOT_IMPLEMENTED_INTERFACE, "Not Implemented Interface.");
}

/**
 * @public
 * @returns {string}
 */
BaseFacade.prototype.getSupportedEngines = function () {
	// OVERRIDE
	throw new ErrorObject(ErrorName.NOT_IMPLEMENTED_INTERFACE, "Not Implemented Interface.");
}

/**
 * @public
 * @returns {string}
 */
BaseFacade.prototype.getRootFolderName = function () {
	// OVERRIDE
	throw new ErrorObject(ErrorName.NOT_IMPLEMENTED_INTERFACE, "Not Implemented Interface.");
}

/**
 * @public
 * @returns {string}
 */
BaseFacade.prototype.getScriptDataDirName = function () {
	// OVERRIDE
	throw new ErrorObject(ErrorName.NOT_IMPLEMENTED_INTERFACE, "Not Implemented Interface.");
}

/**
 * @public
 * @returns {string}
 */
BaseFacade.prototype.getSettingsSectionName = function () {
	// OVERRIDE
	throw new ErrorObject(ErrorName.NOT_IMPLEMENTED_INTERFACE, "Not Implemented Interface.");
}

/**
 * @public
 * @returns {string} {@link ScriptMode}
 */
BaseFacade.prototype.getScriptMode = function () {
	// OVERRIDE
	throw new ErrorObject(ErrorName.NOT_IMPLEMENTED_INTERFACE, "Not Implemented Interface.");
}

/**
 * @public
 * @returns {string}
 */
BaseFacade.prototype.getScriptVersion = function () {
	// OVERRIDE
	throw new ErrorObject(ErrorName.NOT_IMPLEMENTED_INTERFACE, "Not Implemented Interface.");
}

/**
 * @public
 * @description Min compatible AE version
 * @returns {string} AEVersion
 */
BaseFacade.prototype.getAEMinVersion = function () {
	// OVERRIDE
	throw new ErrorObject(ErrorName.NOT_IMPLEMENTED_INTERFACE, "Not Implemented Interface.");
}