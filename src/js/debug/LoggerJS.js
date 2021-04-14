/**
 * @constructor
 * @class LoggerJS
 */
function LoggerJS() {
    if (LoggerJS._instance != null) {
        throw new ErrorObject(ErrorName.SINGLETON_VIOLATION, this.constructor.name + " instance already constructed.");
    }
    LoggerJS._instance = this;
}

/**
 * @static
 * @description The Singleton instance of LoggerJS
 * @return {LoggerJS}
 */
LoggerJS.getInstance = function () {
    if (LoggerJS._instance == null) {
        LoggerJS._instance = new LoggerJS();
    }
    return LoggerJS._instance;
}

/**
 * @public
 * @param {string} logFilePath
 */
LoggerJS.prototype.initialize = function (logFilePath) {
	// alert("LoggerJS.initialize > logFilePath : " + logFilePath);
	this._logFilePath = logFilePath;
	this._csInterface = new CSInterface();
	this._log = ["log:"];
    this._write();
}

/**
 * @public
 * @param {string} comment
 * @param {*} value
 */
LoggerJS.prototype.log = function (comment, value) {
    var line = comment;
    if (value !== undefined) {
        try {
			line = line + " : " + JSON.stringify(value);
        } catch (error) {
			line = line + " : " + "can't stringify value";
        }
	}
	this._log.push(line);
	this._write();
}

/**
 * @protected
 */
LoggerJS.prototype._write = function () {
	var lines = [];
	lines.push("var file = File(" + JSON.stringify(this._logFilePath) + ");");
	lines.push("var txt = " + JSON.stringify(this._log.join("\n")) + ";");
	lines.push("file.open(\"w\");");
	lines.push("file.writeln(txt);");
	lines.push("file.close();");
	var extendScript = lines.join("\n");

	// alert("LoggerJS._write > extendScript : " + extendScript);

	try {
		this._csInterface.evalScript(extendScript, function (response) {
			if (response != null) {
				// alert("LoggerJS.prototype._write > resieve response : " + JSON.stringify(response));
			}
		});
	} catch (error) {
		alert(error.message);
	}
}

/**
 * @protected
 * @type {CSInterface}
 */
LoggerJS.prototype._csInterface = null;

/**
 * @type {string}
 */
LoggerJS.prototype._logFilePath = null;

/**
 * @type {Array}
 */
LoggerJS.prototype._log = null;

/**
 * @static
 * @param {string} comment
 * @param {*} value
 */
LoggerJS.log = function (comment, value) {
	LoggerJS.getInstance().log(comment, value);
}

/**
 * @protected
 * @type {LoggerJS}
 */
LoggerJS._instance = null;