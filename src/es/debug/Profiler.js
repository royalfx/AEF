/**
 * @constructor
 * @class Profiler
 * @param {string} key
 * @description Time displayed in milliseconds.
 */
function Profiler(key) {
	/*ASSERT*/AssertManager.typeString(key);
	this._log = [key];
	this._total = 0;
	$.hiresTimer;
}

/**
 * @public
 * @param {string} comment
 * @param {boolean} startOrEnd
 */
Profiler.prototype.step = function (comment, startOrEnd) {
	var t = ($.hiresTimer * 0.001);
	this._total += t;
	if (startOrEnd === true) {
		this._log.push("\t");
	}
	this._log.push(t.toFixed(2) + " (ms) : " + comment);
	if (startOrEnd === false) {
		this._log.push("\t");
	}
}

/**
 * @public
 */
Profiler.prototype.complete = function () {
	this._log.push(("total : " + this._total + " (ms)"));
}

/**
 * @public
 */
Profiler.prototype.show = function () {
	this.complete();
	alert(this._log.join("\n"), this.constructor.name);
}

/**
 * @public
 */
Profiler.prototype.reset = function () {
	this._total = 0;
	this._log = this._log.slice(0, 1);
	$.hiresTimer;
}

/**
 * @public
 * @returns {Array}
 */
Profiler.prototype.getLog = function () {
	return this._log;
}

/**
 * @public
 * @returns {Array}
 */
Profiler.prototype.getTotal = function () {
	return this._total;
}

/**
 * @type {Array}
 */
Profiler.prototype._log = null;

/**
 * @type {number}
 */
Profiler.prototype._total = null;