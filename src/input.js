import InputTypes from './inputTypes';
import defaultValidators from './defaultValidators';

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
    style: {
      strict: false,
      validClass: null,
      invalidClass: null,
    },
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
    } = Object.assign({}, this.defaults, { style: formStyle }, options);

    if (!el || !(el instanceof HTMLInputElement)) {
      throw new Error(`Element ${el} is not an input field`);
    }

    /**
     * HTML input element.
     * @member Input#el
     * @type {HTMLInputElement}
     */
    this.el = el;

    if (!type) {
      const typeAttr = el.getAttribute('type');
      this.type = typeAttr ? this.attrToType(typeAttr) : InputTypes.NONE;
    } else {
      this.type = type;
    }

    const validations = Object.keys(validators);

    /**
     * Validators for the input.
     * @member Input#validators
     * @type {Array.<function>}
     */
    this.validators = Object.assign(
      validators,
      this.getValidators(this.type.validations.filter(validation =>
        !validations.contains(validation))),
    );

    /**
     * Input value change callback.
     * @member Input#onChange
     * @type {Function}
     */
    this.onChange = onChange;

    /**
     * Style for the input.
     * @member Input#style
     * @prop {Boolean} strict
     * @prop {String} validClass
     * @prop {String} invalidClass
     */
    this.style = style;
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
        return InputTypes.MAIL;
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

  /**
   * Get validators from a list of validations.
   *
   * @param {Array.<String>} validations
   * @return {Object}
   */
  static getValidators = validations =>
    validations.map(validation => defaultValidators[validation]);
}

export default Input;
