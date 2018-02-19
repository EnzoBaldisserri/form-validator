import { Validations, addValidations } from './validations';
import Input from './input';
import Form from './form';
import InputTypes from './inputTypes';

/**
 * Validator
 * @class
 */
class Validator {
  static defaults = {
    forms: [],
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
      forms,
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
     *
     */
    this.forms = this.initForms(forms);

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

  initForms = (forms) => {
    // If there's one unique form
    if (!Array.isArray(forms)) {
      return [
        new Form(this, forms),
      ];
    }

    return forms.map(form => new Form(
      this,
      form,
    ));
  }

  initFields = (fields) => {
    if (!Array.isArray(fields)) {
      return [
        new Input(this, fields),
      ];
    }

    return fields.map(field => new Input(
      this,
      field,
    ));
  }

  init = () => {
    const { forms, fields } = this;

    forms.forEach(form => form.init());
    fields.forEach(input => input.init());

    this.updateValidity();
  }

  /**
   * Checks if the fields which are not in a form are valid.
   * If necessary, updates the `valid` attribute and calls the custom `onValidityChange` function.
   */
  updateValidity = () => {
    const {
      fields,
      onValidityChange,
    } = this;

    const valid = fields.reduce((fieldsValid, field) =>
      fieldsValid && field.valid, true);

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
