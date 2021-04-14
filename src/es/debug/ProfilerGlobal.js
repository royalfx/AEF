/**
 * @constructor
 * @class ProfilerGlobal
 */
function ProfilerGlobal() {
	if (ProfilerGlobal._instance != null) {
		throw new ErrorObject(ErrorName.SINGLETON_VIOLATION, this.constructor.name + " instance already constructed.", $.fileName, $.line);
	}
	ProfilerGlobal._instance = this;
}

/**
 * @protected
 * @type {ProfilerGlobal}
 */
ProfilerGlobal._instance = null;

/**
 * @static
 * @description The Singleton instance of ProfilerGlobal
 * @return {ProfilerGlobal}
 */
ProfilerGlobal.getInstance = function () {
	if (ProfilerGlobal._instance == null) {
		ProfilerGlobal._instance = new ProfilerGlobal();
	}
	return ProfilerGlobal._instance;
}

/**
 * @public
 */
ProfilerGlobal.prototype.initialize = function (name, file) {
	if (this.profiler) {
		this.profiler.reset();
	} else {
		this.profiler = new Profiler(name);
	}
	this.file = file;
}

/**
 * @public
 * @type {Profiler}
 */
ProfilerGlobal.prototype.profiler = null;

/**
 * @public
 * @type {File}
 */
ProfilerGlobal.prototype.file = null;

/**
 * @static
 * @public
 * @param {string} comment
 * @param {boolean} startOrEnd
 */
ProfilerGlobal.step = function (comment, startOrEnd) {
	ProfilerGlobal._instance.profiler.step(comment, startOrEnd);
}

/**
 * @static
 * @public
 */
ProfilerGlobal.reset = function () {
	ProfilerGlobal._instance.profiler.reset();
}

/**
 * @static
 * @public
 */
ProfilerGlobal.complete = function () {
	ProfilerGlobal._instance.profiler.complete();
}

/**
 * @static
 * @public
 * @param {boolean} showLog
 */
ProfilerGlobal.saveLog = function (showLog) {
	var str = ProfilerGlobal._instance.profiler.getLog().join("\n") + "\n";
	as_fileWrite(ProfilerGlobal._instance.file, str, false);
	if (showLog) {
		ProfilerGlobal._instance.file.execute();
	}
}