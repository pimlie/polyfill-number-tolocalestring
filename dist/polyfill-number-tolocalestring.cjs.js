'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('@babel/polyfill');

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

var toLocaleStringSupportsLocales = function toLocaleStringSupportsLocales() {

  try {
  } catch (e) {
    return e.name === 'RangeError';
  }

  return false;
};

var toLocaleStringSupportsOptions = function toLocaleStringSupportsOptions() {
  return !!((typeof Intl === "undefined" ? "undefined" : _typeof(Intl)) === 'object' && Intl && typeof Intl.NumberFormat === 'function');
};

var shouldPolyfill = function shouldPolyfill() {
  var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return !(!force && toLocaleStringSupportsLocales() && toLocaleStringSupportsOptions());
};

var setPolyfill = function setPolyfill(Globalize, cldrData) {
  var original = Number.prototype.toLocaleString;
  var loadedCldrKeys = {};

  var loadCldrData = function loadCldrData(keys) {
    var keysLoaded = 0;
    keys.forEach(function (key) {
      if (loadedCldrKeys[key]) {
        keysLoaded++;
      }
    });

    if (keys.length === keysLoaded) {
      return true;
    }

    try {
      var allData = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (!loadedCldrKeys[key]) {
            var data = cldrData(key);

            if (!data) {
              break;
            } else {
              allData.push(data);
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (allData.length) {
        Globalize.load.apply(Globalize, allData);
      }

      return keys.length === keysLoaded + allData.length;
    } catch (e) {
      return false;
    }
  };

  if (loadCldrData(['supplemental/likelySubtags', 'supplemental/numberingSystems'])) {
    var loadedLocales = {};

    Number.prototype.toLocaleString = function toLocaleString(lcl, opts) {
      var locale = lcl || 'en';
      var options = Object.assign({
        style: 'decimal'
      }, opts);
      var showCurrency = options.style === 'currency' && loadCldrData(['supplemental/currencyData', 'supplemental/plurals']);

      if (!loadedLocales[locale]) {
        (function () {
          var loadLocales = [locale];

          for (var _i = 0; _i < loadLocales.length; _i++) {
            var loadLocale = loadLocales[_i];
            var keys = ["main/".concat(loadLocale, "/numbers")];

            if (showCurrency) {
              keys.push("main/".concat(loadLocale, "/currencies"));
            }

            if (loadCldrData(keys)) {
              loadedLocales[locale] = true;
              break;
            } else if (loadLocales.length === 1) {
              var globalize = Globalize(locale);
              Array.prototype.push.apply(loadLocales, [globalize.cldr.attributes.maxLanguageId, globalize.cldr.attributes.minLanguageId, globalize.cldr.attributes.bundle].filter(function (v) {
                return !!v && !loadLocales.includes(v);
              }));
            }
          }
        })();
      }

      if (!loadedLocales[locale]) {
        return this.toString();
      }

      var formatter;

      if (showCurrency) {
        var currencyOptions = Object.assign(options, {
          style: options.currencyDisplay
        });
        formatter = Globalize(locale).currencyFormatter(options.currency, currencyOptions);
      } else {
        formatter = Globalize(locale).numberFormatter(options);
      }

      return formatter(this.valueOf());
    };
  }

  return function () {
    Number.prototype.toLocaleString = original;
  };
};

var polyfillSync = function polyfillSync() {
  var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (!shouldPolyfill(force)) {
    return false;
  }

  var Globalize = require('globalize');

  var cldrData = require('cldr-data');

  return setPolyfill(Globalize, cldrData);
};
var polyfill$1 =
/*#__PURE__*/
function () {
  var _polyfill = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var force,
        Globalize,
        cldrData,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            force = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;

            if (shouldPolyfill(force)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", false);

          case 3:
            _context.next = 5;
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require('globalize'));
            });

          case 5:
            Globalize = _context.sent.default;
            _context.next = 8;
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require('cldr-data'));
            });

          case 8:
            cldrData = _context.sent.default;
            return _context.abrupt("return", setPolyfill(Globalize, cldrData));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function polyfill$$1() {
    return _polyfill.apply(this, arguments);
  };
}();

exports.polyfillSync = polyfillSync;
exports.polyfill = polyfill$1;
exports.default = polyfill$1;
