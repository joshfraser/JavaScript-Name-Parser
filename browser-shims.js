if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/gm, '');
	};
}

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement, fromIndex) {
		if ( this === undefined || this === null ) {
			throw new TypeError( '"this" is null or not defined' );
		}

		var length = this.length >>> 0; // Hack to convert object.length to a UInt32

		fromIndex = +fromIndex || 0;

		if (Math.abs(fromIndex) === Infinity) {
			fromIndex = 0;
		}

		if (fromIndex < 0) {
			fromIndex += length;
			if (fromIndex < 0) {
				fromIndex = 0;
			}
		}

		for (;fromIndex < length; fromIndex++) {
			if (this[fromIndex] === searchElement) {
				return fromIndex;
			}
		}

		return -1;
	};
}

if (!Array.prototype.filter)
{
	Array.prototype.filter = function(fun /*, thisArg */)
	{
		if (this === undefined || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function")
			throw new TypeError();

		var res = [];
		var thisArg = arguments.length >= 2 ? arguments[1] : undefined;
		for (var i = 0; i < len; i++)
		{
			if (i in t)
			{
				var val = t[i];

				// NOTE: Technically this should Object.defineProperty at
				//       the next index, as push can be affected by
				//       properties on Object.prototype and Array.prototype.
				//       But that method's new, and collisions should be
				//       rare, so use the more-compatible alternative.
				if (fun.call(thisArg, val, i, t))
					res.push(val);
			}
		}

		return res;
	};
}

if (!Array.prototype.map)
{
	Array.prototype.map = function(fun /*, thisArg */)
	{
		if (this === undefined || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function")
			throw new TypeError();

		var res = new Array(len);
		var thisArg = arguments.length >= 2 ? arguments[1] : undefined;
		for (var i = 0; i < len; i++)
		{
			// NOTE: Absolute correctness would demand Object.defineProperty
			//       be used.  But this method is fairly new, and failure is
			//       possible only if Object.prototype or Array.prototype
			//       has a property |i| (very unlikely), so use a less-correct
			//       but more portable alternative.
			if (i in t)
				res[i] = fun.call(thisArg, t[i], i, t);
		}

		return res;
	};
}
