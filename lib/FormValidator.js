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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validation = exports.Validations = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function regexMatchCounter(input, regex) {
  var globalRegex = new RegExp(regex, 'g');
  var matches = input.match(globalRegex);
  return matches === null ? 0 : matches.length;
}

function defaultRegexCountValidation(input, params, regex) {
  var matchCount = regexMatchCounter(input, regex);
  var count = params.count,
      min = params.min,
      max = params.max;

  if (count !== undefined) {
    return matchCount === count;
  }

  return (min === undefined || min <= matchCount) && (max === undefined || matchCount <= max);
}

var Validation = function Validation(repr, validate) {
  _classCallCheck(this, Validation);

  if (typeof validate !== 'function') {
    throw new Error('Invalid argument: \'validate\' must be a function');
  }

  this.repr = repr;
  this.validate = validate;
};

exports.Validation = Validation;
var Validations = {
  new: function _new(name, validate) {
    var hasParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (name === 'new') {
      throw new Error('Invalid argument: name can\'t be \'new\'');
    }

    var newValidation = hasParam ? _defineProperty({}, name, function (params, repr) {
      return new Validation(repr || name, validate(params));
    }) : _defineProperty({}, name, function (repr) {
      return new Validation(repr || name, validate);
    });
    Object.assign(Validations, newValidation);
  },
  CHARACTERS: function CHARACTERS(_ref3, repr) {
    var count = _ref3.count,
        min = _ref3.min,
        max = _ref3.max;
    return new Validation(repr || 'CHARACTERS', function (value) {
      return count !== undefined ? value.length === count : (min === undefined || value.length >= min) && (max === undefined || value.length <= max);
    });
  },
  DATE_BETWEEN: function DATE_BETWEEN(_ref4, repr) {
    var min = _ref4.min,
        max = _ref4.max;
    return new Validation(repr || 'DATE_BETWEEN', function (value) {
      var date = new Date(value);
      return (min === undefined || min < date) && (max === undefined || date < max);
    });
  },
  EMAIL: function EMAIL(repr) {
    return new Validation(repr || 'EMAIL', function (value) {
      return /\S+@\S+\.\S+/.test(value);
    });
  },
  EMPTY: function EMPTY(repr) {
    return new Validation(repr || 'EMPTY', function (value) {
      return !value.length;
    });
  },
  LETTERS: function LETTERS(params, repr) {
    return new Validation(repr || 'LETTERS', function (value) {
      return defaultRegexCountValidation(value, params, /[A-Za-z]/);
    });
  },
  LOWERCASES: function LOWERCASES(params, repr) {
    return new Validation(repr || 'LOWERCASES', function (value) {
      return defaultRegexCountValidation(value, params, /[a-z]/);
    });
  },
  MATCH: function MATCH(_ref5, repr) {
    var regex = _ref5.regex;
    return new Validation(repr || 'MATCH', function (value) {
      return new RegExp(regex, '').test(value);
    });
  },
  NOT_EMPTY: function NOT_EMPTY(repr) {
    return new Validation(repr || 'NOT_EMPTY', function (value) {
      return !!value.length;
    });
  },
  NUMBERS: function NUMBERS(params, repr) {
    return new Validation(repr || 'NUMBERS', function (value) {
      return defaultRegexCountValidation(value, params, /\d/);
    });
  },
  SPECIAL_CHARACTERS: function SPECIAL_CHARACTERS(params, repr) {
    return new Validation(repr || 'SPECIAL_CHARACTERS', function (value) {
      return defaultRegexCountValidation(value, params, /[^A-Za-z0-9]/);
    });
  },
  UPPERCASES: function UPPERCASES(params, repr) {
    return new Validation(repr || 'UPPERCASES', function (value) {
      return defaultRegexCountValidation(value, params, /[A-Z]/);
    });
  },
  VALUE_IN: function VALUE_IN(_ref6, repr) {
    var min = _ref6.min,
        max = _ref6.max;
    return new Validation(repr || 'VALUE_IN', function (value) {
      return (min === undefined || +value >= min) && (max === undefined || +value <= max);
    });
  }
};
exports.Validations = Validations;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validations = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getDefaultTextAreaValidations($element) {
  var validations = [];
  var required = $element.required,
      maxLength = $element.maxLength;

  if (required) {
    validations.push(_validations.Validations.NOT_EMPTY());
  }

  if (maxLength >= 0) {
    validations.push(_validations.Validations.CHARACTERS({
      max: maxLength
    }));
  }

  return validations;
}

function getDefaultTextValidations($element) {
  var validations = [];
  var required = $element.required,
      maxLength = $element.maxLength,
      pattern = $element.pattern;

  if (required) {
    validations.push(_validations.Validations.NOT_EMPTY());
  }

  if (maxLength >= 0) {
    validations.push(_validations.Validations.CHARACTERS({
      max: maxLength
    }));
  }

  if (pattern) {
    validations.push(_validations.Validations.MATCH({
      regex: pattern
    }));
  }

  return validations;
}

function getDefaultNumberValidations($element) {
  var validations = [];
  var required = $element.required,
      min = $element.min,
      max = $element.max;

  if (required) {
    validations.push(_validations.Validations.NOT_EMPTY());
  }

  if (min !== '' || max !== '') {
    validations.push(_validations.Validations.VALUE_IN({
      min: min,
      max: max
    }));
  }

  return validations;
}

function getDefaultDateValidations($element) {
  var validations = [];
  var required = $element.required,
      min = $element.min,
      max = $element.max;

  if (required) {
    validations.push(_validations.Validations.NOT_EMPTY());
  }

  if (min || max) {
    validations.push(_validations.Validations.DATE_BETWEEN({
      min: min ? new Date(min) : undefined,
      max: max ? new Date(max) : undefined
    }));
  }

  return validations;
}

function getDefaultFileValidations() {
  throw new Error('Invalid type: File inputs aren\'t handled by the library');
}

var _default = {
  DATE: {
    changeProperty: 'change',
    defaultValidations: getDefaultDateValidations
  },
  DATETIME: {
    changeProperty: 'change',
    defaultValidations: getDefaultDateValidations
  },
  EMAIL: {
    changeProperty: 'input',
    defaultValidations: function defaultValidations($el) {
      return [_validations.Validations.EMAIL()].concat(_toConsumableArray(getDefaultTextValidations($el)));
    }
  },
  EMPTY: {
    changeProperty: 'input',
    defaultValidations: function defaultValidations() {
      return [_validations.Validations.EMPTY()];
    }
  },
  FILE: {
    changePrperty: 'input',
    defaultValidations: getDefaultFileValidations
  },
  NONE: {},
  NUMBER: {
    changeProperty: 'input',
    defaultValidations: getDefaultNumberValidations
  },
  PASSWORD: {
    changeProperty: 'input',
    defaultValidations: getDefaultTextValidations
  },
  POSITIVE_NUMBER: {
    changeProperty: 'input',
    defaultValidations: function defaultValidations($el) {
      return [_validations.Validations.VALUE_IN({
        min: 0
      })].concat(_toConsumableArray(getDefaultNumberValidations($el)));
    }
  },
  RANGE: {
    changeProperty: 'input',
    defaultValidations: getDefaultNumberValidations
  },
  SEARCH: {
    changeProperty: 'input',
    defaultValidations: getDefaultTextValidations
  },
  TEL: {
    changeProperty: 'input',
    defaultValidations: getDefaultTextValidations
  },
  TEXT: {
    changeProperty: 'input',
    defaultValidations: getDefaultTextValidations
  },
  TEXTAREA: {
    changeProperty: 'input',
    defaultValidations: getDefaultTextAreaValidations
  },
  TIME: {
    changeProperty: 'change',
    defaultValidations: getDefaultDateValidations
  },
  URL: {
    changeProperty: 'input',
    defaultValidations: getDefaultTextValidations
  }
};
exports.default = _default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
Object.defineProperty(exports, "Validations", {
  enumerable: true,
  get: function get() {
    return _validations.Validations;
  }
});
Object.defineProperty(exports, "InputTypes", {
  enumerable: true,
  get: function get() {
    return _inputTypes.default;
  }
});

var _validations = __webpack_require__(0);

var _formfield = _interopRequireDefault(__webpack_require__(5));

var _form = _interopRequireDefault(__webpack_require__(4));

var _inputTypes = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Validator
 * @class
 */
var Validator = function Validator(options) {
  _classCallCheck(this, Validator);

  _initialiseProps.call(this);

  var _Object$assign = Object.assign({}, Validator.defaults, options),
      forms = _Object$assign.forms,
      fields = _Object$assign.fields,
      style = _Object$assign.style;

  if (!forms && !fields) {
    throw new Error('Invalid paramters: No forms nor fields defined');
  }
  /**
   * General style for the children of the form validator.
   *
   * @member Validator#style
   * @prop {String} validClass
   * @prop {String} invalidClass
   */


  this.style = style;
  /**
   * Forms controlled by the validator.
   *
   * @member Validator#forms
   * @type {Array.<Form>}
   */

  this.forms = this.initForms(forms);
  /**
   * Input fields controlled by the validator.
   *
   * @member Validator#fields
   * @type {Array.<FormField>}
   */

  this.fields = this.initFields(fields);
  this.init();
};

Object.defineProperty(Validator, "defaults", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    forms: [],
    fields: [],
    style: {
      validClass: 'valid',
      invalidClass: 'valid'
    }
    /**
     * Initialize the form validator.
     * @param {Object} options
     */

  }
});

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  Object.defineProperty(this, "initForms", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(forms) {
      // If there's one unique form
      if (!Array.isArray(forms)) {
        return [_form.default.initForm(_this, forms)];
      }

      return forms.map(function (form) {
        return _form.default.initForm(_this, form);
      });
    }
  });
  Object.defineProperty(this, "initFields", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(fields) {
      // If there's one unique field
      if (!Array.isArray(fields)) {
        return [_formfield.default.initFormField(_this, fields)];
      }

      return fields.map(function (field) {
        return _formfield.default.initFormField(_this, field);
      });
    }
  });
  Object.defineProperty(this, "init", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      var forms = _this.forms,
          fields = _this.fields;
      forms.forEach(function (form) {
        return form.init();
      });
      fields.forEach(function (field) {
        return field.init();
      });
    }
  });
};

function create(options) {
  return new Validator(options);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formfield = _interopRequireDefault(__webpack_require__(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Representation of a controlled form element.
 * @class
 */
var Form = function Form(parent, options) {
  _classCallCheck(this, Form);

  _initialiseProps.call(this);

  var _Object$assign = Object.assign({}, Form.defaults, options),
      $el = _Object$assign.$el,
      name = _Object$assign.name,
      fields = _Object$assign.fields,
      submit = _Object$assign.submit,
      style = _Object$assign.style,
      onValidityChange = _Object$assign.onValidityChange;

  var $form = $el || document.forms[name];

  if (!$form || !($form instanceof HTMLFormElement)) {
    throw new Error('Parameter error: $el must be an HTMLFormElement');
  }
  /**
   * The form element.
   *
   * @member Form#$form
   * @type {HTMLFormElement}
   */


  this.$form = $form;
  /**
   * The FormValidator containing this form.
   *
   * @member Form#parent
   * @type {FormValidator}
   */

  this.parent = parent;
  /**
   * The submit button of the form.
   * It is enabled when all the fields are valid.
   *
   * @member Form#$submit
   * @type {HTMLButtonElement|HTMLInputElement}
   */

  this.$submit = this.initSubmit(submit);
  /**
   * Style specific to the form and its fields.
   *
   * @member Form#style
   * @prop {String} validClass
   * @prop {String} invalidClass
   */

  this.style = Object.assign({}, parent.style, style);
  /**
   * The fields that are controlled in this form.
   *
   * @member Form#fields
   * @type {Array.<FormField>}
   */

  this.fields = this.initFields(fields);
  /**
   * Function called when validity of the form changes.
   *
   * @member Form#onValidityChange
   * @type {Function}
   */

  this.onValidityChange = onValidityChange;
  /**
   * The validity of the form.
   *
   * @member Form#valid
   * @type {Boolean}
   */

  this.valid = undefined;
};

Object.defineProperty(Form, "defaults", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    $el: null,
    name: null,
    fields: [],
    submit: null,
    style: {},
    onValidityChange: null
    /**
     * Creates a form instance.
     *
     * @param {FormValidator} parent
     * @param {Object} options
     */

  }
});
Object.defineProperty(Form, "initForm", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: function value(parent, formProps) {
    if (typeof formProps === 'string' || typeof form === 'number') {
      return new Form(parent, {
        name: formProps
      });
    }

    if (formProps instanceof HTMLElement) {
      return new Form(parent, {
        $el: formProps
      });
    }

    return new Form(parent, formProps);
  }
});

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  Object.defineProperty(this, "initSubmit", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(submit) {
      if (submit === true) {
        return _this.$form.querySelector('[type=submit]');
      }

      if (typeof submit === 'string' || typeof submit === 'number') {
        return _this.$form.elements[submit];
      }

      if (submit instanceof HTMLButtonElement || submit instanceof HTMLInputElement) {
        if (submit.type !== 'submit') {
          throw new Error('Parameter error: Submit button or input must be of type \'submit\'');
        }

        if (submit.form !== _this.$form) {
          throw new Error('Parameter error: Submit button or input must be part of the form it\'s associated to');
        }

        return submit;
      }

      return null;
    }
  });
  Object.defineProperty(this, "initFields", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(fields) {
      // If fields isn't defined, get all fields of the form
      var controlled = fields.length ? fields : Array.of.apply(Array, _toConsumableArray(_this.$form.elements)).filter(function (el) {
        return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
      }); // If there's one unique field

      if (!Array.isArray(controlled)) {
        return [_formfield.default.initFormField(_this, controlled)];
      }

      return controlled.map(function (field) {
        return _formfield.default.initFormField(_this, field);
      });
    }
  });
  Object.defineProperty(this, "init", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      var fields = _this.fields;
      fields.forEach(function (field) {
        return field.init();
      });

      _this.updateValidity();
    }
  });
  Object.defineProperty(this, "updateValidity", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      var fields = _this.fields,
          $submit = _this.$submit;
      var valid = fields.reduce(function (formValid, field) {
        return formValid && field.valid;
      }, true);

      if (_this.valid !== valid) {
        _this.valid = valid;

        if ($submit) {
          $submit.disabled = !valid;
        }

        if (_this.onValidityChange) {
          _this.onValidityChange(valid);
        }
      }
    }
  });
};

var _default = Form;
exports.default = _default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inputTypes = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Representation of a controlled input element.
 * @class
 */
var FormField =
/*#__PURE__*/
function () {
  function FormField(parent, options) {
    var _parent$$form;

    _classCallCheck(this, FormField);

    _initialiseProps.call(this);

    var _Object$assign = Object.assign({}, FormField.defaults, options),
        $el = _Object$assign.$el,
        name = _Object$assign.name,
        type = _Object$assign.type,
        validations = _Object$assign.validations,
        style = _Object$assign.style,
        onInit = _Object$assign.onInit,
        onChange = _Object$assign.onChange;

    var $input = $el || ((_parent$$form = parent.$form) === null || _parent$$form === void 0 ? void 0 : _parent$$form.elements[name]);

    if (!$input || !($input instanceof HTMLInputElement || $input instanceof HTMLTextAreaElement)) {
      throw new Error('Parameter error: $el must be an input field or a textarea');
    }
    /**
     * The HTML <input> or <textarea> element.
     *
     * @member FormField#$input
     * @type {HTMLInputElement|HTMLTextareaElement}
     */


    this.$input = $input;
    /**
     * The form containing this input field.
     *
     * @member FormField#parent
     * @type {FormValidator|Form}
     */

    this.parent = parent;
    /**
     * The type of the input field.
     *
     * @member FormField#type
     * @type {InputType}
     */

    this.type = this.initType(type);
    var defaultValidations = this.type.defaultValidations($input);
    /**
     * Validations for the input.
     *
     * @member FormField#validations
     * @type {Array.<function>}
     */

    this.validations = Object.assign(defaultValidations, validations);
    /**
     * Specific style for the input.
     *
     * @member FormField#style
     * @prop {String} validClass
     * @prop {String} invalidClass
     */

    this.style = Object.assign({}, parent.style, style);
    /**
     * Callback on input initialization.
     * Return <code>false</code> if you don't want validity classes to be applied.
     *
     * @member FormField#onInit
     * @type {Function}
     */

    this.onInit = onInit;
    /**
     * Callback on input value change.
     * Return <code>false</code> if you don't want validity classes to be applied.
     *
     * @member FormField#onChange
     * @type {Function}
     */

    this.onChange = onChange;
    /**
     * The validity state of the input.
     *
     * @member FormField#valid
     * @type {Boolean}
     */

    this.valid = false;
  }
  /**
   * Computes the type of an Input.
   *
   * @param  {InputType} type The property provided by the user
   * @return {InputType} The definitive type
   */


  _createClass(FormField, [{
    key: "initType",
    value: function initType(type) {
      if (!type) {
        var $input = this.$input;

        if ($input instanceof HTMLTextAreaElement) {
          return _inputTypes.default.TEXTAREA;
        }

        var typeAttr = $input.getAttribute('type');
        return typeAttr ? FormField.attrToType(typeAttr) : _inputTypes.default.NONE;
      }

      return type;
    }
    /**
     * Initializes the input.
     * Creates the event listeners,
     * checks validity of the field value
     * and calls the `onInit` custom function.
     */

  }], [{
    key: "attrToType",

    /**
     * Return the internal representation of a type of input.
     *
     * @param {String} type A value of the type attribute
     * @return {Object}
     */
    value: function attrToType(type) {
      var upperType = type.toUpperCase();

      if (upperType === 'DATETIME-LOCAL') {
        return _inputTypes.default.DATETIME;
      }

      var inputType = _inputTypes.default[upperType];

      if (!inputType) {
        return _inputTypes.default.NONE;
      }

      return inputType;
    }
  }]);

  return FormField;
}();

Object.defineProperty(FormField, "defaults", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    $el: null,
    name: null,
    type: null,
    validations: [],
    style: {},
    onInit: null,
    onChange: null
    /**
     * Creates a FormField instance.
     *
     * @param {FormValidator|Form} parent
     * @param {Object} options
     */

  }
});
Object.defineProperty(FormField, "initFormField", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: function value(parent, field) {
    if (typeof field === 'string') {
      return new FormField(parent, {
        name: field
      });
    }

    if (field instanceof HTMLElement) {
      return new FormField(parent, {
        $el: field
      });
    }

    return new FormField(parent, field);
  }
});

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  Object.defineProperty(this, "init", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      var $input = _this.$input,
          onInit = _this.onInit;
      var changeProperty = _this.type.changeProperty;

      if (changeProperty) {
        $input.addEventListener(changeProperty, _this.handleChange);
        $input.addEventListener('blur', _this.handleChange);
      }

      var properties = _this.updateValidity();

      if (onInit && onInit !== false && onInit($input.value, properties) !== false || $input.value) {
        _this.applyClasses();
      }
    }
  });
  Object.defineProperty(this, "handleChange", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event) {
      var $input = _this.$input,
          onChange = _this.onChange;

      var properties = _this.updateValidity();

      if (onChange) {
        if (onChange(event, $input.value, properties) !== false) {
          _this.applyClasses();
        } else {
          _this.removeClasses();
        }
      } else if (onChange !== false) {
        _this.applyClasses();
      }
    }
  });
  Object.defineProperty(this, "updateValidity", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      var parent = _this.parent,
          $input = _this.$input,
          validations = _this.validations;
      var valids = [];
      var invalids = [];
      var value = $input.value;
      validations.forEach(function (_ref) {
        var validate = _ref.validate,
            repr = _ref.repr;

        if (validate(value)) {
          valids.push(repr);
        } else {
          invalids.push(repr);
        }
      });
      var isValid = !invalids.length;

      if (_this.valid !== isValid) {
        var _parent$updateValidit;

        _this.valid = isValid;
        (_parent$updateValidit = parent.updateValidity) === null || _parent$updateValidit === void 0 ? void 0 : _parent$updateValidit.call(parent);
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
      var $input = _this.$input,
          valid = _this.valid,
          _this$style = _this.style,
          validClass = _this$style.validClass,
          invalidClass = _this$style.invalidClass;

      if (valid) {
        $input.classList.remove(invalidClass);
        $input.classList.add(validClass);
      } else {
        $input.classList.remove(validClass);
        $input.classList.add(invalidClass);
      }
    }
  });
  Object.defineProperty(this, "removeClasses", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      var $input = _this.$input,
          _this$style2 = _this.style,
          validClass = _this$style2.validClass,
          invalidClass = _this$style2.invalidClass;
      $input.classList.remove(validClass);
      $input.classList.remove(invalidClass);
    }
  });
};

var _default = FormField;
exports.default = _default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=FormValidator.js.map