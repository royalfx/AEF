/**
 * @constructor
 * @class ValidateManager
 */
function ValidateManager() {
	//
}

ValidateManager.significant = function (value) {
	return (value !== null) && (value !== undefined);
}
ValidateManager.typeFunction = function (value) {
	return (value !== null) && (typeof value === "function");
}

ValidateManager.typeString = function (value) {
	return (value !== null) && (typeof value === "string");
}

ValidateManager.typeNumber = function (value) {
	return (value !== null) && (typeof value === "number");
}

ValidateManager.typeBoolean = function (value) {
	return (value !== null) && (typeof value === "boolean");
}

ValidateManager.typeObject = function (value) {
	return (value !== null) && (typeof value === "object") && (value.constructor === Object);
}

ValidateManager.instanceOf = function (value, classRef) {
	return (value instanceof classRef);
}

ValidateManager.stringLengthRange = function (value, min, max) {
	/*ASSERT*/AssertManager.typeNumber(min);
	/*ASSERT*/AssertManager.typeNumber(max);
	return (value !== null) && (typeof value == "string") && (value.length >= min) && (value.length <= max);
}

ValidateManager.stringLength = function (value, length) {
	/*ASSERT*/AssertManager.typeNumber(length);
	return (value !== null) && (typeof value == "string") && (value.length === length);
}

ValidateManager.numberRange = function (value, min, max) {
	/*ASSERT*/AssertManager.typeNumber(min);
	/*ASSERT*/AssertManager.typeNumber(max);
	return (value !== null) && (typeof value == "number") && (value >= min) && (value <= max);
}

ValidateManager.numberEnvatoID = function (value) {
	return (value !== null) && (typeof value == "number") && (value.toString().length === 8);
}

ValidateManager.stringVersion = function (value) {
	return (value !== null) && (typeof value == "string") && (value.match(RegExpPattern.NUMBERS_DOT) === null) && (value.length >= 3) && ((value.split(".").length == 2) || (value.split(".").length == 3)) && (value != "0.0") && (value != "0.0.0");
}

ValidateManager.stringWord = function (value) {
	return (value !== null) && (typeof value == "string") && (value.length > 0) && (value.indexOf(" ") == -1)
}

ValidateManager.stringContains = function (value, str) {
	/*ASSERT*/AssertManager.typeString(str);
	return (value !== null) && (typeof value == "string") && (value.length > 0) && (value.indexOf(str) >= 0)
}

ValidateManager.oneOf = function (value, arr) {
	/*ASSERT*/AssertManager.instanceOf(arr, Array);
	return (as_arrayCheckValue(value, arr) >= 0);
}