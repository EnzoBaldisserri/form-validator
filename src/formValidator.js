import defaultValidations from './validations';
import Input from './input';

class FormValidator {
  static defaultOptions = {
    fields: [],
    validations: defaultValidations,
    style: {
      strict: false,
      validClass: 'valid',
      invalidClass: 'invalid',
    },
  };

  constructor(options) {
    const {
      fields,
      validations,
      style,
    } = Object.assign({}, options, this.defaultOptions);

    this.initValidations(validations);
    this.initFields(fields);
    this.initStyle(style);
  }

  initValidations = (validations) => {
    this.validations = validations;
  }

  initFields = (fields) => {
    this.fields = fields.map(field => new Input(field));
  }

  initStyle = (style) => {
    this.style = style;
  }
}

export default FormValidator;
