import InputTypes from './inputTypes';
import { fromValidations } from './validators';

/**
 * Representation of an HTML input element,
 * validated by the validator.
 * @class
 */
class Input {
  static defaults = {
    $el: null,
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
      $el,
      type,
      validators,
      style,
      onInit,
      onChange,
    } = Object.assign({}, Input.defaults, options);

    if (!$el || !($el instanceof HTMLInputElement)) {
      throw new Error(`${$el} is not an input field`);
    }

    /**
     * The HTML <input> element.
     *
     * @member Input#$el
     * @type {HTMLInputElement}
     */
    this.$el = $el;

    /**
     * The FormValidator containing this input field.
     *
     * @member Input#form
     * @type {FormValidator}
     */
    this.form = form;

    /**
     * The type of the input field.
     *
     * @member Input#member
     * @type {InputType}
     */
    this.type = Input.initType(type, $el);

    const userValidations = Object.keys(validators);
    const defaultValidations = this.type.defaultValidations($el)
      .filter(validation => !userValidations.includes(validation));

    /**
     * Validators for the input.
     * @member Input#validators
     * @type {Array.<function>}
     */
    this.validators = {
      ...fromValidations(defaultValidations),
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

    /**
     * The validity state of the input.
     *
     * @member Input#valid
     * @type {Boolean}
     */
    this.valid = false;

    this.init();
  }

  /**
   * Initializes the input.
   * Creates the event listeners,
   * checks validity of the field value
   * and calls the `onInit` custom function.
   */
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

  /**
   * Handle a change in the value of the field.
   *
   * @param  {Event} event The event that occured
   */
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

  /**
   * Checks if the field is valid.
   * If necessary, updates the state of the field
   * and calls the form's `updateValidity` method.
   *
   * @return {Object} The properties of validity.
   */
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

  /**
   * Apply the right validity classes to the element.
   */
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

  /**
   * Remove the validity classes from the element.
   */
  removeClasses = () => {
    const {
      $el,
      style: { validClass, invalidClass },
    } = this;

    $el.classList.remove(validClass);
    $el.classList.remove(invalidClass);
  }

  /**
   * Computes the type of an Input.
   *
   * @param  {InputType|String} type The property provided by the user
   * @param  {HTMLElement} $el The input element to which will be applied the type
   * @return {InputType} The definitive type
   */
  static initType(type, $el) {
    if (!type) {
      const typeAttr = $el.getAttribute('type');
      return typeAttr ? Input.attrToType(typeAttr) : InputTypes.NONE;
    }
    return type;
  }

  /**
   * Return the internal representation of a type of input.
   *
   * @param {String} type A value of the type attribute
   * @return {Object}
   */
  static attrToType(type) {
    const upperType = type.toUpperCase();

    if (upperType === 'DATETIME-LOCAL') {
      return InputTypes.DATETIME;
    }

    const inputType = InputTypes[upperType];
    if (!inputType) {
      return InputTypes.NONE;
    }
    return inputType;
  }
}

export default Input;
