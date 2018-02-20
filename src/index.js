import { Validations } from './validations';
import FormField from './formfield';
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
    } = Object.assign({}, Validator.defaults, options);

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
  }

  initForms = (forms) => {
    // If there's one unique form
    if (!Array.isArray(forms)) {
      return [
        Form.initForm(this, forms),
      ];
    }

    return forms.map(form => Form.initForm(this, form));
  }

  initFields = (fields) => {
    // If there's one unique field
    if (!Array.isArray(fields)) {
      return [
        FormField.initFormField(this, fields),
      ];
    }

    return fields.map(field => FormField.initFormField(this, field));
  }

  init = () => {
    const { forms, fields } = this;

    forms.forEach(form => form.init());
    fields.forEach(field => field.init());
  }
}

function create(options) {
  return new Validator(options);
}

export {
  create,
  Validations,
  InputTypes,
};
