import { defaultValidators, fromValidations } from './validators';
import Input from './input';
import InputTypes from './inputTypes';

/**
 * Validator
 * @class
 */
class Validator {
  static defaultStyle = {
    validClass: 'valid',
    invalidClass: 'invalid',
  }

  /**
   * Initialize the form validator.
   * @param {Object} options
   */
  constructor(options) {
    const {
      fields,
      validators,
      style,
      onValidityChange,
    } = options;

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
    this.validators = Object.assign({}, defaultValidators, validators);

    /**
     * Input fields to be validated.
     * @member Validator#fields
     * @type {Array.<Input>}
     */
    this.fields = fields.map(field => new Input(
      this,
      Object.assign(field, { validators: fromValidations(field.validations, this.validators) }),
    ));

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

  init = () => {
    this.updateValidity();
  }

  /**
   * Checks if the form should be valid or not.
   * Updates the `valid` attribute and calls the custom `onValidityChange` function if necessary.
   */
  updateValidity = () => {
    const {
      fields,
      onValidityChange,
    } = this;

    const valid = fields.reduce((formValid, field) =>
      formValid && field.valid, true);

    if (this.valid !== valid) {
      this.valid = valid;
      if (onValidityChange) {
        onValidityChange(valid);
      }
    }
  }
}

export {
  Validator,
  InputTypes,
};
