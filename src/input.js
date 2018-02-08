import InputTypes from './inputTypes';

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
    validations: [],
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
   * @param {Object} formStyle The style of the containing validator
   */
  constructor(options, formStyle) {
    const {
      el,
      type,
      onChange,
      validations,
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
    }

    /**
     * Validations for the input.
     * @member Input#validations
     * @type {Array.<function>}
     */
    this.validations = [
      ...this.type.validations.filter(validation => !validations.contains(validation)),
      ...validations,
    ];

    /**
     * Input value change callback.
     * @member Input#onChange
     * @type {Function}
     */
    this.onChange = onChange;

    /**
     * Style of the input.
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
   * @param {String} type A type attribute
   * @type {Object}
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
}

export default Input;
