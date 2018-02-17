(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("FormValidator", [], factory);
	else if(typeof exports === 'object')
		exports["FormValidator"] = factory();
	else
		root["FormValidator"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromValidations = exports.defaultValidators = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

var regExps = {
  email: /\S+@\S+\.\S+/,
  specialCharacters: /[^A-Za-z0-9]/,
  letter: /[A-Za-z]/,
  lowercaseLetter: /[a-z]/,
  uppercaseLetter: /[A-Z]/,
  number: /\d/
};

function regExpMatchCounter(input, regExp) {
  var globalRegExp = new RegExp(regExp, 'g');
  var matches = input.match(globalRegExp);
  return matches === null ? 0 : matches.length;
}

function defaultRegExpValidator(input, params, regExp) {
  var matchCount = regExpMatchCounter(input, regExp);
  var count = params.count,
      min = params.min,
      max = params.max;

  if (count !== undefined) {
    return matchCount === count;
  }

  return (min === undefined || matchCount >= min) && (max === undefined || matchCount <= max);
}

var defaultValidators = {
  EMPTY: function EMPTY(value) {
    return !value.length;
  },
  NO_EMPTY: function NO_EMPTY(value) {
    return value.length;
  },
  EMAIL: function EMAIL(value) {
    return regExps.email.test(value);
  },
  VALUE_IN: function VALUE_IN(_ref) {
    var min = _ref.min,
        max = _ref.max;
    return function (value) {
      return (min === undefined || +value >= min) && (max === undefined || +value <= max);
    };
  },
  DATE_BETWEEN: function DATE_BETWEEN(_ref2) {
    var min = _ref2.min,
        max = _ref2.max;
    return function (value) {
      var date = new Date(value);
      return (min === undefined || min < date) && (max === undefined || date < max);
    };
  },
  CHARACTERS: function CHARACTERS(_ref3) {
    var count = _ref3.count,
        min = _ref3.min,
        max = _ref3.max;
    return function (value) {
      return count ? value.length === count : (min === undefined || value.length >= min) && (max === undefined || value.length <= max);
    };
  },
  SPECIAL_CHARACTERS: function SPECIAL_CHARACTERS(params) {
    return function (value) {
      return defaultRegExpValidator(value, params, regExps.specialCharacters);
    };
  },
  LETTERS: function LETTERS(params) {
    return function (value) {
      return defaultRegExpValidator(value, params, regExps.letter);
    };
  },
  UPPERCASES: function UPPERCASES(params) {
    return function (value) {
      return defaultRegExpValidator(value, params, regExps.uppercaseLetter);
    };
  },
  LOWERCASES: function LOWERCASES(params) {
    return function (value) {
      return defaultRegExpValidator(value, params, regExps.lowercaseLetter);
    };
  },
  NUMBERS: function NUMBERS(params) {
    return function (value) {
      return defaultRegExpValidator(value, params, regExps.number);
    };
  }
};
exports.defaultValidators = defaultValidators;

var fromValidations = function fromValidations() {
  var validations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var validators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultValidators;
  return validations.reduce(function (result, validation) {
    if (Array.isArray(validation)) {
      var _validation = _slicedToArray(validation, 2),
          name = _validation[0],
          params = _validation[1];

      return _extends({}, result, _defineProperty({}, name, validators[name](params)));
    }

    return _extends({}, result, _defineProperty({}, validation, validators[validation]));
  }, {});
};

exports.fromValidations = fromValidations;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  NONE: {},
  EMPTY: {
    changeProperty: 'input',
    validations: ['EMPTY']
  },
  TEXT: {
    changeProperty: 'input',
    validations: ['NO_EMPTY']
  },
  EMAIL: {
    changeProperty: 'input',
    validations: ['NO_EMPTY', 'EMAIL']
  },
  PASSWORD: {
    changeProperty: 'input',
    validations: ['NO_EMPTY']
  },
  NUMBER: {
    changeProperty: 'input',
    validations: ['NO_EMPTY']
  },
  POSITIVE_NUMBER: {
    changeProperty: 'input',
    validations: ['NO_EMPTY', ['VALUE_IN', {
      min: 0
    }]]
  },
  DATE: {
    changeProperty: 'change',
    validations: ['NO_EMPTY']
  },
  TIME: {
    changeProperty: 'change',
    validations: ['NO_EMPTY']
  },
  DATETIME: {
    changeProperty: 'change',
    validations: ['NO_EMPTY']
  }
};
exports.default = _default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "InputTypes", {
  enumerable: true,
  get: function get() {
    return _inputTypes.default;
  }
});
exports.Validator = void 0;

var _validators = __webpack_require__(0);

var _input = _interopRequireDefault(__webpack_require__(3));

var _inputTypes = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Validator
 * @class
 */
var Validator =
/*#__PURE__*/
function () {
  function Validator(options) {
    var _this = this;

    _classCallCheck(this, Validator);

    _initialiseProps.call(this);

    var fields = options.fields,
        validators = options.validators,
        style = options.style,
        onValidityChange = options.onValidityChange;

    if (!fields) {
      throw new Error('No fields defined');
    }
    /**
     * General style of the form validator.
     *
     * @member Validator#style
     * @prop {String} validClass
     * @prop {String} invalidClass
     */


    this.style = Object.assign({}, Validator.defaultStyle, style);
    /**
     * Custom validators for the validator.
     * @member Validator#validators
     * @type {Array.<Function>}
     */

    this.validators = Object.assign({}, _validators.defaultValidators, validators);
    /**
     * Input fields to be validated.
     * @member Validator#fields
     * @type {Array.<Input>}
     */

    this.fields = fields.map(function (field) {
      return new _input.default(_this, Object.assign(field, {
        validators: (0, _validators.fromValidations)(field.validations, _this.validators)
      }));
    });
    /**
     * Function called when validity of the form changes.
     *
     * @member Validator#onValidityChange
     * @type {Function}
     */

    this.onValidityChange = onValidityChange;
    /**
     * Correspond to the validity of the form.
     *
     * @member Validator#valid
     * @type {Boolean}
     */

    this.valid = null;
    this.init();
  }

  _createClass(Validator, [{
    key: "init",
    value: function init() {
      this.updateValidity();
    }
  }]);

  return Validator;
}();

exports.Validator = Validator;
Object.defineProperty(Validator, "defaultStyle", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    validClass: 'valid',
    invalidClass: 'invalid'
    /**
     * Initialize the form validator.
     * @param {Object} options
     */

  }
});

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  Object.defineProperty(this, "updateValidity", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      var fields = _this2.fields,
          onValidityChange = _this2.onValidityChange;
      var valid = fields.reduce(function (formValid, field) {
        return formValid && field.valid;
      }, true);

      if (_this2.valid !== valid) {
        _this2.valid = valid;

        if (onValidityChange) {
          onValidityChange(valid);
        }
      }
    }
  });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inputTypes = _interopRequireDefault(__webpack_require__(1));

var _validators = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Representation of an HTML input element,
 * validated by the validator.
 * @class
 */
var Input =
/*#__PURE__*/
function () {
  function Input(form, options) {
    _classCallCheck(this, Input);

    _initialiseProps.call(this);

    var _Object$assign = Object.assign({}, Input.defaults, options),
        el = _Object$assign.el,
        type = _Object$assign.type,
        validators = _Object$assign.validators,
        style = _Object$assign.style,
        onInit = _Object$assign.onInit,
        onChange = _Object$assign.onChange;

    if (!el || !(el instanceof HTMLInputElement)) {
      throw new Error("".concat(el, " is not an input field"));
    }
    /**
     * HTML input element.
     * @member Input#$el
     * @type {HTMLInputElement}
     */


    this.$el = el;
    /**
     * The FormValidator containing this input field.
     * @member Input#form
     * @type {FormValidator}
     */

    this.form = form;

    if (!type) {
      var typeAttr = el.getAttribute('type');
      this.type = typeAttr ? Input.attrToType(typeAttr) : _inputTypes.default.NONE;
    } else if (typeof type === 'string') {
      this.type = this.attrToType(type);
    } else {
      this.type = type;
    }

    var userValidations = Object.keys(validators);
    var typeDefaultValidations = this.type.validations.filter(function (validation) {
      return !userValidations.includes(validation);
    });
    /**
     * Validators for the input.
     * @member Input#validators
     * @type {Array.<function>}
     */

    this.validators = _extends({}, (0, _validators.fromValidations)(typeDefaultValidations), validators);
    /**
     * Style for the input.
     * @member Input#style
     * @prop {String} validClass
     * @prop {String} invalidClass
     */

    this.style = Object.assign({}, Input.defaultStyle, form.style, style);
    /**
     * Callback on input initialization.
     * Return <code>false</code> if you don't want validity classes to be applied.
     *
     * @membre Input#onInit
     * @type {Function}
     */

    this.onInit = onInit;
    /**
     * Callback on input value change.
     * Return <code>false</code> if you don't want validity classes to be applied.
     *
     * @member Input#onChange
     * @type {Function}
     */

    this.onChange = onChange;
    this.valid = false;
    this.init();
  }

  _createClass(Input, null, [{
    key: "attrToType",

    /**
     * Return the internal representation of a type of input.
     *
     * @param {String} type A value of the type attribute
     * @return {Object}
     */
    value: function attrToType(type) {
      switch (type.toLowerCase()) {
        case 'text':
          return _inputTypes.default.TEXT;

        case 'email':
          return _inputTypes.default.EMAIL;

        case 'password':
          return _inputTypes.default.PASSWORD;

        case 'number':
          return _inputTypes.default.NUMBER;

        case 'date':
          return _inputTypes.default.DATE;

        case 'time':
          return _inputTypes.default.TIME;

        case 'datetime-local':
          return _inputTypes.default.DATETIME;

        default:
          return _inputTypes.default.NONE;
      }
    }
  }]);

  return Input;
}();

Object.defineProperty(Input, "defaults", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    el: null,
    type: null,
    onChange: null,
    validators: []
  }
});
Object.defineProperty(Input, "defaultStyle", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    validClass: null,
    invalidClass: null
    /**
     * Creates an Input instance.
     *
     * @param {Object} options
     * @param {Object} formStyle
     */

  }
});

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  Object.defineProperty(this, "init", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      var changeProperty = _this.type.changeProperty;

      if (changeProperty) {
        _this.$el.addEventListener(changeProperty, _this.handleChange);

        _this.$el.addEventListener('blur', _this.handleChange);
      }

      var $el = _this.$el,
          onInit = _this.onInit;

      var properties = _this.checkValidity();

      if (onInit && !onInit === false && onInit($el.value, properties) !== false || $el.value) {
        _this.applyClasses();
      }
    }
  });
  Object.defineProperty(this, "handleChange", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event) {
      var $el = _this.$el,
          onChange = _this.onChange;

      var properties = _this.checkValidity();

      if (onChange) {
        if (onChange(event, $el.value, properties) !== false) {
          _this.applyClasses();
        } else {
          _this.removeClasses();
        }
      } else {
        _this.applyClasses();
      }
    }
  });
  Object.defineProperty(this, "checkValidity", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      var validators = _this.validators,
          form = _this.form;
      var valids = [];
      var invalids = [];
      var value = _this.$el.value;
      Object.entries(validators).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            validator = _ref2[1];

        if (validator(value)) {
          valids.push(name);
        } else {
          invalids.push(name);
        }
      });
      var isValid = !invalids.length;

      if (_this.valid !== isValid) {
        _this.valid = isValid;
        form.updateValidity();
      }

      return {
        isValid: isValid,
        valids: valids,
        invalids: invalids
      };
    }
  });
  Object.defineProperty(this, "applyClasses", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      var $el = _this.$el,
          valid = _this.valid,
          _this$style = _this.style,
          validClass = _this$style.validClass,
          invalidClass = _this$style.invalidClass;

      if (valid) {
        $el.classList.remove(invalidClass);
        $el.classList.add(validClass);
      } else {
        $el.classList.remove(validClass);
        $el.classList.add(invalidClass);
      }
    }
  });
  Object.defineProperty(this, "removeClasses", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      var $el = _this.$el,
          _this$style2 = _this.style,
          validClass = _this$style2.validClass,
          invalidClass = _this$style2.invalidClass;
      $el.classList.remove(validClass);
      $el.classList.remove(invalidClass);
    }
  });
};

var _default = Input;
exports.default = _default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=FormValidator.js.map