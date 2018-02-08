import defaultValidations from './defaultValidations';
import Input from './input';

/**
 * FormValidator
 * @class
 */
class FormValidator {
  static defaults = {
    fields: [],
    validations: defaultValidations,
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
      validations,
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
     * Custom validations for the validator.
     * @member FormValidator#validations
     * @type {Array.<Function>}
     */
    this.validations = validations;

    /**
     * Input fields to be validated.
     * @member FormValidator#fields
     * @type {Array.<Input>}
     */
    this.fields = fields.map(field => new Input(field, this.style));
  }
}

export default FormValidator;
