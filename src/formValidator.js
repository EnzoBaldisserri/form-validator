import { fromValidations, defaultValidators } from './validators';
import Input from './input';

/**
 * FormValidator
 * @class
 */
class FormValidator {
  static defaults = {
    fields: [],
    validators: defaultValidators,
    style: {
      strict: false,
      validClass: 'valid',
      invalidClass: 'invalid',
    },
  };

  /**
   * Initialize the form validator.
   * @param {Object} options
   */
  constructor(options) {
    const {
      fields,
      validators,
      style,
    } = Object.assign({}, this.defaults, options);

    /**
     * General style of the form validator.
     *
     * @member FormValidator#style
     * @prop {Boolean} strict
     * @prop {String} validClass
     * @prop {String} invalidClass
     */
    this.style = style;

    /**
     * Custom validators for the validator.
     * @member FormValidator#validators
     * @type {Array.<Function>}
     */
    this.validators = validators;

    /**
     * Input fields to be validated.
     * @member FormValidator#fields
     * @type {Array.<Input>}
     */
    this.fields = fields.map(field => new Input(
      Object.assign(field, { validators: fromValidations(field.validations, this.validators) }),
      this.style,
    ));
  }
}

export default FormValidator;
