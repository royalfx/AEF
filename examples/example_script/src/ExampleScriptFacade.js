/**
 * @constructor
 * @class ExampleScriptFacade
 * @extends BaseFacade
 * @param {string} key The multiton key to use to retrieve the Facade instance.
 */
function ExampleScriptFacade(key) {
	BaseFacade.apply(this, [key]);
}

/**
 * @description Inheritance
 */
var Transitive = new Function;
Transitive.prototype = BaseFacade.prototype;
ExampleScriptFacade.prototype = new Transitive;
ExampleScriptFacade.prototype.constructor = ExampleScriptFacade;

/**
 * @public
 * @param {string} key
 * @return {ExampleScriptFacade}
 */
ExampleScriptFacade.getInstance = function (key) {
	if (!Facade.hasCore(key)) {
		new ExampleScriptFacade(key);
	}
	return Facade.getInstance(key);
}

/**
 * @override
 * @public
 * @returns {string}
 */
ExampleScriptFacade.prototype.getScriptName = function () {
	return "Example Script";
}

/**
 * @override
 * @public
 * @returns {string}
 */
ExampleScriptFacade.prototype.getScriptVersion = function () {
	return "0.0.1";
}

/**
 * @override
 * @public
 * @returns {string} {@link ScriptMode}
 */
ExampleScriptFacade.prototype.getScriptMode = function () {
	/*DEVELOP*/ return ScriptMode.DEVELOP;
	// /*RELEASE*/  return ScriptMode.RELEASE;
}

/**
 * @override
 * @public
 * @description Min compatible AE version
 * @returns {string} AEVersion
 */
ExampleScriptFacade.prototype.getAEMinVersion = function () {
	return AEVersion.CC2020;
}

/**
 * @override
 * @public
 * @returns {string}
 */
ExampleScriptFacade.prototype.getSettingsSectionName = function () {
	return "RoyalFX_" + this.getScriptName().replace(/\s/g, "_");
}