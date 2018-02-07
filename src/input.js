import InputTypes from './inputTypes';

class Input {
  static defaultOptions = {
    el: null,
    type: null,
    onChange: null,
    validations: [],
    style: {
      strict: false,
      validClass: null,
      invalidClass: null,
    },
  }

  constructor(options) {
    const {
      el,
      type,
      onChange,
      validations,
      style,
    } = Object.assign({}, options, this.defaultOptions);

    if (!el || !(el instanceof HTMLInputElement)) {
      throw new Error(`Element ${el} is not a field`);
    }

    if (!type) {
      const typeAttr = el.getAttribute('type');
      this.type = typeAttr ? this.attrToType(typeAttr) : InputTypes.NONE;
    }

    Object.assign(this, {
      el,
      type,
      onChange,
      validations,
      style,
    });
  }

  static attrToType = (type) => {
    switch (type.toLowerCase()) {
      case 'text':
        return InputTypes.TEXT;
      case 'email':
        return InputTypes.MAIL;
      case 'password':
        return InputTypes.PASSWORD;
      case 'number':
        return InputTypes.NUMBER;
      case 'date':
        return InputTypes.DATE;
      case 'time':
        return InputTypes.TIME;
      case 'datetime-local':
        return InputTypes.DATETIME;
      default:
        return InputTypes.NONE;
    }
  }
}

export default Input;
