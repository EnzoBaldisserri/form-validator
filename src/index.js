import { defaultValidators, fromValidations } from './validators';
import Input from './input';

/**
 * Validator
 * @class
 */
class Validator {
  static defaults = {
    fields: [],
    validators: defaultValidators,
  };

  static defaultStyle = {
    strict: false,
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
    } = Object.assign({}, Validator.defaults, options);

    /**
     * General style of the form validator.
     *
     * @member FormValidator#style
     * @prop {Boolean} strict
     * @prop {String} validClass
     * @prop {String} invalidClass
     */
    this.style = Object.assign({}, Validator.defaultStyle, style);

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

/* eslint import/prefer-default-export: off */
export { Validator };
