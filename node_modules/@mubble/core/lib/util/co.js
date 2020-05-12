"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function co(gen) {
    var ctx = this, slice = Array.prototype.slice, args = slice.call(arguments, 1);
    function toPromise(obj) {
        if (!obj)
            return obj;
        if (isPromise(obj))
            return obj;
        if (isGeneratorFunction(obj) || isGenerator(obj))
            return co.call(this, obj);
        if ('function' == typeof obj)
            return thunkToPromise.call(this, obj);
        if (Array.isArray(obj))
            return arrayToPromise.call(this, obj);
        if (isObject(obj))
            return objectToPromise.call(this, obj);
        return obj;
    }
    function thunkToPromise(fn) {
        var ctx = this;
        return new Promise(function (resolve, reject) {
            fn.call(ctx, function (err, res) {
                if (err)
                    return reject(err);
                if (arguments.length > 2)
                    res = slice.call(arguments, 1);
                resolve(res);
            });
        });
    }
    function arrayToPromise(obj) {
        return Promise.all(obj.map(toPromise, this));
    }
    function objectToPromise(obj) {
        var results = new obj.constructor();
        var keys = Object.keys(obj);
        var promises = [];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var promise = toPromise.call(this, obj[key]);
            if (promise && isPromise(promise))
                defer(promise, key);
            else
                results[key] = obj[key];
        }
        return Promise.all(promises).then(function () {
            return results;
        });
        function defer(promise, key) {
            // pre define the key in the result
            results[key] = undefined;
            promises.push(promise.then(function (res) {
                results[key] = res;
            }));
        }
    }
    function isPromise(obj) {
        return 'function' == typeof obj.then;
    }
    function isGenerator(obj) {
        return 'function' == typeof obj.next && 'function' == typeof obj.throw;
    }
    function isGeneratorFunction(obj) {
        var constructor = obj.constructor;
        if (!constructor)
            return false;
        if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName)
            return true;
        return isGenerator(constructor.prototype);
    }
    function isObject(val) {
        return Object == val.constructor;
    }
    // we wrap everything in a promise to avoid promise chaining,
    // which leads to memory leak errors.
    // see https://github.com/tj/co/issues/180
    return new Promise(function (resolve, reject) {
        if (typeof gen === 'function')
            gen = gen.apply(ctx, args);
        if (!gen || typeof gen.next !== 'function')
            return resolve(gen);
        onFulfilled();
        /**
         * @param {Mixed} res
         * @return {Promise}
         * @api private
         */
        function onFulfilled(res) {
            var ret;
            try {
                ret = gen.next(res);
            }
            catch (e) {
                return reject(e);
            }
            next(ret);
            return null;
        }
        /**
         * @param {Error} err
         * @return {Promise}
         * @api private
         */
        function onRejected(err) {
            var ret;
            try {
                ret = gen.throw(err);
            }
            catch (e) {
                return reject(e);
            }
            next(ret);
        }
        /**
         * Get the next value in the generator,
         * return a promise.
         *
         * @param {Object} ret
         * @return {Promise}
         * @api private
         */
        function next(ret) {
            if (ret.done)
                return resolve(ret.value);
            var value = toPromise.call(ctx, ret.value);
            if (value && isPromise(value))
                return value.then(onFulfilled, onRejected);
            return onFulfilled(value);
            /*return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
              + 'but the following object was passed: "' + String(ret.value) + '"'))*/
        }
    });
}
exports.co = co;
//# sourceMappingURL=co.js.map