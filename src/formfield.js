import InputTypes from './inputTypes';

/**
 * Representation of a controlled input element.
 * @class
 */
class FormField {
  static defaults = {
    $el: null,
    name: null,
    type: null,
    validations: [],
    style: {},
    onInit: null,
    onChange: null,
  }

  /**
   * Creates a FormField instance.
   *
   * @param {FormValidator|Form} parent
   * @param {Object} options
   */
  constructor(parent, options) {
    const {
      $el,
      name,
      type,
      validations,
      style,
      onInit,
      onChange,
    } = Object.assign({}, FormField.defaults, options);

    const $input = $el || parent.$form?.elements[name];

    if (!$input || !($input instanceof HTMLInputElement || $input instanceof HTMLTextAreaElement)) {
      throw new Error(`${typeof $input} '${$input}' is not an input field`);
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

    const defaultValidations = this.type.defaultValidations($input);

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
  initType(type) {
    if (!type) {
      const { $input } = this;

      if ($input instanceof HTMLTextAreaElement) {
        return InputTypes.TEXTAREA;
      }

      const typeAttr = $input.getAttribute('type');
      return typeAttr ? FormField.attrToType(typeAttr) : InputTypes.NONE;
    }

    return type;
  }

  /**
   * Initializes the input.
   * Creates the event listeners,
   * checks validity of the field value
   * and calls the `onInit` custom function.
   */
  init = () => {
    const { $input, onInit } = this;
    const { changeProperty } = this.type;

    if (changeProperty) {
      $input.addEventListener(changeProperty, this.handleChange);
      $input.addEventListener('blur', this.handleChange);
    }

    const properties = this.updateValidity();

    if ((onInit && onInit !== false && onInit($input.value, properties) !== false)
      || $input.value) {
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
      $input,
      onChange,
    } = this;

    const properties = this.updateValidity();

    if (onChange) {
      if (onChange(event, $input.value, properties) !== false) {
        this.applyClasses();
      } else {
        this.removeClasses();
      }
    } else if (onChange !== false) {
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
  updateValidity = () => {
    const { parent, $input, validations } = this;

    const valids = [];
    const invalids = [];

    const { value } = $input;

    validations.forEach(({ validate, repr }) => {
      if (validate(value)) {
        valids.push(repr);
      } else {
        invalids.push(repr);
      }
    });

    const isValid = !invalids.length;
    if (this.valid !== isValid) {
      this.valid = isValid;
      parent.updateValidity?.();
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
      $input,
      valid,
      style: { validClass, invalidClass },
    } = this;

    if (valid) {
      $input.classList.remove(invalidClass);
      $input.classList.add(validClass);
    } else {
      $input.classList.remove(validClass);
      $input.classList.add(invalidClass);
    }
  }

  /**
   * Remove the validity classes from the element.
   */
  removeClasses = () => {
    const {
      $input,
      style: { validClass, invalidClass },
    } = this;

    $input.classList.remove(validClass);
    $input.classList.remove(invalidClass);
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

export default FormField;
