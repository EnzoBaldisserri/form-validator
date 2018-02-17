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
    validators: [],
    onInit: null,
    onChange: null,
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
  constructor(form, options) {
    const {
      el,
      type,
      validators,
      style,
      onInit,
      onChange,
    } = Object.assign({}, Input.defaults, options);

    if (!el || !(el instanceof HTMLInputElement)) {
      throw new Error(`${el} is not an input field`);
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
      const typeAttr = el.getAttribute('type');
      this.type = typeAttr ? Input.attrToType(typeAttr) : InputTypes.NONE;
    } else if (typeof type === 'string') {
      this.type = this.attrToType(type);
    } else {
      this.type = type;
    }

    const userValidations = Object.keys(validators);
    const typeDefaultValidations = this.type.validations.filter(validation =>
      !userValidations.includes(validation));

    /**
     * Validators for the input.
     * @member Input#validators
     * @type {Array.<function>}
     */
    this.validators = {
      ...fromValidations(typeDefaultValidations),
      ...validators,
    };

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

  init = () => {
    const { changeProperty } = this.type;

    if (changeProperty) {
      this.$el.addEventListener(changeProperty, this.handleChange);
      this.$el.addEventListener('blur', this.handleChange);
    }

    const {
      $el,
      onInit,
    } = this;

    const properties = this.checkValidity();

    if ((onInit && !onInit === false && onInit($el.value, properties) !== false) || $el.value) {
      this.applyClasses();
    }
  }

  handleChange = (event) => {
    const {
      $el,
      onChange,
    } = this;

    const properties = this.checkValidity();

    if (onChange) {
      if (onChange(event, $el.value, properties) !== false) {
        this.applyClasses();
      } else {
        this.removeClasses();
      }
    } else {
      this.applyClasses();
    }
  }

  checkValidity = () => {
    const { validators, form } = this;

    const valids = [];
    const invalids = [];

    const { value } = this.$el;

    Object.entries(validators).forEach(([name, validator]) => {
      if (validator(value)) {
        valids.push(name);
      } else {
        invalids.push(name);
      }
    });

    const isValid = !invalids.length;
    if (this.valid !== isValid) {
      this.valid = isValid;
      form.updateValidity();
    }

    return {
      isValid,
      valids,
      invalids,
    };
  }

  applyClasses = () => {
    const {
      $el,
      valid,
      style: { validClass, invalidClass },
    } = this;

    if (valid) {
      $el.classList.remove(invalidClass);
      $el.classList.add(validClass);
    } else {
      $el.classList.remove(validClass);
      $el.classList.add(invalidClass);
    }
  }

  removeClasses = () => {
    const {
      $el,
      style: { validClass, invalidClass },
    } = this;

    $el.classList.remove(validClass);
    $el.classList.remove(invalidClass);
  }

  /**
   * Return the internal representation of a type of input.
   *
   * @param {String} type A value of the type attribute
   * @return {Object}
   */
  static attrToType(type) {
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
