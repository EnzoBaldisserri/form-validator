import { Validations, addValidations } from './validations';
import Input from './input';
import InputTypes from './inputTypes';

/**
 * Validator
 * @class
 */
class Validator {
  static defaults = {
    fields: [],
    style: {
      validClass: 'valid',
      invalidClass: 'valid',
    },
    onValidityChange: null,
  }

  /**
   * Initialize the form validator.
   * @param {Object} options
   */
  constructor(options) {
    const {
      fields,
      style,
      onValidityChange,
    } = Object.assign({}, Validator.defaults, options);

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
    this.style = style;

    /**
     */

    /**
     * Input fields to be validated.
     *
     * @member Validator#fields
     * @type {Array.<Input>}
     */
    this.fields = this.initFields(fields);

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

  initFields = fields =>
    fields.map(field => new Input(
      this,
      field,
    ));

  init = () => {
    this.fields.forEach(input => input.init());

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
  Validations,
  addValidations,
  InputTypes,
};
