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
    } = options;

    if (!fields) {
      throw new Error('No fields defined');
    }

    /**
     * General style of the form validator.
     *
     * @member FormValidator#style
     * @prop {String} validClass
     * @prop {String} invalidClass
     */
    this.style = Object.assign({}, Validator.defaultStyle, style);

    /**
     * Custom validators for the validator.
     * @member FormValidator#validators
     * @type {Array.<Function>}
     */
    this.validators = Object.assign({}, defaultValidators, validators);

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

export {
  Validator,
  InputTypes,
};
