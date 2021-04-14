/**
 * @constructor
 * @class Logger
 */
function Logger() {
    if (Logger._instance != null) {
        throw new ErrorObject(ErrorName.SINGLETON_VIOLATION, this.constructor.name + " instance already constructed.", $.fileName, $.line);
    }
    Logger._instance = this;
}

/**
 * @protected
 * @type {Logger}
 */
Logger._instance = null;

/**
 * @static
 * @description The Singleton instance of Logger
 * @return {Logger}
 */
Logger.getInstance = function () {
    if (Logger._instance == null) {
        Logger._instance = new Logger();
    }
    return Logger._instance;
}

/**
 * @public
 * @param {File} logFile
 */
Logger.prototype.initialize = function (logFile) {
    if (logFile) {
        this._logFile = logFile;
    } else {
        var logFileName = ("Log_" + (new Date().getTime()) + ".txt");
        this._logFile = File(Folder.desktop.fsName + "/" + logFileName).saveDlg("Save log file", FileFilter.TXT);
    }
    var header = "";
    header += "file: " + $.fileName + "\n";
    header += "os: " + $.os + "\n";
    header += "js version: " + $.version + "\n";
    header += "ae version: " + app.version + "\n";
    header += "log: " + "\n";
    this._logFile.open("w");
    this._logFile.write(header);
    this._logFile.close();
}

/**
 * @public
 * @param {string} comment
 * @param {*} value
 */
Logger.prototype.log = function (comment, value) {
    var str = comment;
    if (value !== undefined) {
        try {
            str = str + " : " + as_toString(value);
        } catch (error) {
            str = str + " : " + "can't stringify value";
        }
    }
    this._logFile.open("a");
    this._logFile.writeln(str);
    this._logFile.close();
}

/**
 * @static
 * @param {string} comment
 * @param {*} value
 */
Logger.log = function (comment, value) {
    Logger.getInstance().log(comment, value);
}

/**
 * @type {File}
 */
Logger.prototype._logFile = null;