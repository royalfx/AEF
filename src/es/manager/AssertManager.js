/**
 * @constructor
 * @class AssertManager
 */
function AssertManager() {
	//
}

AssertManager.condition = function (value) {
	if (value !== true) {
		throw new ErrorObject(ErrorName.CUSTOM_CONDITION, "AssertManager: The condition is not satisfied.");
	}
}
AssertManager.significant = function (value) {
	if (!ValidateManager.significant(value)) {
		throw new ErrorObject(ErrorName.TYPE_MISMATCH, "AssertManager: Value is not valid. : " + as_toString(value));
	}
}
AssertManager.typeFunction = function (value) {
	if (!ValidateManager.typeFunction(value)) {
		throw new ErrorObject(ErrorName.TYPE_MISMATCH, "AssertManager: Value is not a function.");
	}
}

AssertManager.typeString = function (value) {
	if (!ValidateManager.typeString(value)) {
		throw new ErrorObject(ErrorName.TYPE_MISMATCH, "AssertManager: Value is not a string.");
	}
}

AssertManager.typeNumber = function (value) {
	if (!ValidateManager.typeNumber(value)) {
		throw new ErrorObject(ErrorName.TYPE_MISMATCH, "AssertManager: Value is not a number.");
	}
}

AssertManager.typeBoolean = function (value) {
	if (!ValidateManager.typeBoolean(value)) {
		throw new ErrorObject(ErrorName.TYPE_MISMATCH, "AssertManager: Value is not a boolean.");
	}
}

AssertManager.typeObject = function (value) {
	if (!ValidateManager.typeObject(value)) {
		throw new ErrorObject(ErrorName.TYPE_MISMATCH, "AssertManager: Value is not an object.");
	}
}

AssertManager.instanceOf = function (value, classRef) {
	if (!ValidateManager.instanceOf(value, classRef)) {
		throw new ErrorObject(ErrorName.INSTANCEOF_MISMATCH, "AssertManager: Value is not a " + JSON.stringify(classRef) + ".");
	}
}

AssertManager.stringLengthRange = function (value, min, max) {
	if (!ValidateManager.typeString(value)) {
		throw new ErrorObject(ErrorName.TYPE_MISMATCH, "AssertManager: Value is not a string.");
	}
	if (!ValidateManager.stringLengthRange(value, min, max)) {
		throw new ErrorObject(ErrorName.STRING_LENGTH, "AssertManager: String length is out of valid range.");
	}
}

AssertManager.stringLength = function (value, length) {
	if (!ValidateManager.typeString(value)) {
		throw new ErrorObject(ErrorName.TYPE_MISMATCH, "AssertManager: Value is not a string.");
	}
	if (!ValidateManager.stringLength(value, length)) {
		throw new ErrorObject(ErrorName.STRING_LENGTH, "AssertManager: String has an invalid length.");
	}
}

AssertManager.numberRange = function (value, min, max) {
	if (!ValidateManager.typeNumber(value)) {
		throw new ErrorObject(ErrorName.TYPE_MISMATCH, "AssertManager: Value is not a number.");
	}
	if (!ValidateManager.numberRange(value, min, max)) {
		throw new ErrorObject(ErrorName.NUMBER_RANGE, "AssertManager: Number is out of valid range.");
	}
}

AssertManager.numberEnvatoID = function (value) {
	if (!ValidateManager.typeNumber(value)) {
		throw new ErrorObject(ErrorName.TYPE_MISMATCH, "AssertManager: Value is not a number.");
	}
	if (!ValidateManager.numberEnvatoID(value)) {
		throw new ErrorObject(ErrorName.STRING_ENVATO_ID, "AssertManager: Number is not valid Envato Item ID.");
	}
}

AssertManager.stringVersion = function (value) {
	if (!ValidateManager.typeString(value)) {
		throw new ErrorObject(ErrorName.TYPE_MISMATCH, "AssertManager: Value is not a string.");
	}
	if (!ValidateManager.stringVersion(value)) {
		throw new ErrorObject(ErrorName.STRING_VERSION, "AssertManager: String is not a valid version number.");
	}
}

AssertManager.stringWord = function (value) {
	if (!ValidateManager.typeString(value)) {
		throw new ErrorObject(ErrorName.TYPE_MISMATCH, "AssertManager: Value is not a string.");
	}
	if (!ValidateManager.stringWord(value)) {
		throw new ErrorObject(ErrorName.STRING_WORD, "AssertManager: String is not valid word.");
	}
}

AssertManager.stringContains = function (value, str) {
	if (!ValidateManager.typeString(value)) {
		throw new ErrorObject(ErrorName.TYPE_MISMATCH, "AssertManager: Value is not a string.");
	}
	if (!ValidateManager.stringContains(value, str)) {
		throw new ErrorObject(ErrorName.STRING_CONTAINS, "AssertManager: String does not contain " + JSON.stringify(str) + ".");
	}
}

AssertManager.oneOf = function (value, arr) {
	if (!ValidateManager.oneOf(value, arr)) {
		throw new ErrorObject(ErrorName.ONE_OF, "AssertManager: Value not found in array.");
	}
}