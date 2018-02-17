import InputTypes from './inputTypes';
import { fromValidations } from './validators';

/**
 * Representation of an HTML input element,
 * validated by the validator.
 * @class
 */
class Input {
  static defaults = {
    el: null,
    type: null,
    onChange: null,
    validators: [],
  }

  static defaultStyle = {
    validClass: null,
    invalidClass: null,
  }

  /**
   * Creates an Input instance.
   *
   * @param {Object} options
   * @param {Object} formStyle
   */
  constructor(options, formStyle) {
    const {
      el,
      type,
      onChange,
      validators,
      style,
    } = Object.assign({}, Input.defaults, options);

    if (!el || !(el instanceof HTMLInputElement)) {
      throw new Error(`Element ${el} is not an input field`);
    }

    /**
     * HTML input element.
     * @member Input#$el
     * @type {HTMLInputElement}
     */
    this.$el = el;

    if (!type) {
      const typeAttr = el.getAttribute('type');
      this.type = typeAttr ? Input.attrToType(typeAttr) : InputTypes.NONE;
    } else if (typeof type === 'string') {
      this.type = this.attrToType(type);
    } else {
      this.type = type;
    }

    const userValidations = Object.keys(validators);

    /**
     * Validators for the input.
     * @member Input#validators
     * @type {Array.<function>}
     */
    this.validators = {
      ...validators, // User defined validators
      ...fromValidations(this.type.validations.filter(validation =>
        !userValidations.includes(validation))), // Default validators from input type
    };

    /**
     * Input value change callback.
     * @member Input#onChange
     * @type {Function}
     */
    this.onChange = onChange;

    /**
     * Style for the input.
     * @member Input#style
     * @prop {String} validClass
     * @prop {String} invalidClass
     */
    this.style = Object.assign({}, Input.defaultStyle, formStyle, style);

    this.init();
  }

  init() {
    const { changeProperty } = this.type;

    if (changeProperty) {
      this.$el.addEventListener(changeProperty, this.handleChange);
      this.$el.addEventListener('blur', this.handleChange);
    }
  }

  handleChange = (event) => {
    const {
      validators,
      onChange,
      style: { validClass, invalidClass },
    } = this;

    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const valids = [];
    const invalids = [];

    Object.entries(validators).forEach(([name, validator]) => {
      if (validator(value)) {
        valids.push(name);
      } else {
        invalids.push(name);
      }
    });

    const isValid = !invalids.length;
    if (isValid) {
      target.classList.remove(invalidClass);
      target.classList.add(validClass);
    } else {
      target.classList.remove(validClass);
      target.classList.add(invalidClass);
    }

    if (onChange) {
      onChange(event, value, {
        isValid,
        valids,
        invalids,
      });
    }
  }

  /**
   * Return the internal representation of a type of input.
   *
   * @param {String} type A value of the type attribute
   * @return {Object}
   */
  static attrToType = (type) => {
    switch (type.toLowerCase()) {
      case 'text':
        return InputTypes.TEXT;
      case 'email':
        return InputTypes.EMAIL;
      case 'password':
        return InputTypes.PASSWORD;
      case 'number':
        return InputTypes.NUMBER;
      case 'date':
        return InputTypes.DATE;
      case 'time':
        return InputTypes.TIME;
      case 'datetime-local':
        return InputTypes.DATETIME;
      default:
        return InputTypes.NONE;
    }
  }
}

export default Input;
