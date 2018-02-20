import Input from './input';

/**
 * Representation of a controlled form element.
 * @class
 */
class Form {
  static defaults = {
    $el: null,
    name: null,
    fields: [],
    style: {},
    onValidityChange: null,
  }

  /**
   * Creates a form instance.
   *
   * @param {FormValidator} parent
   * @param {Object} options
   */
  constructor(parent, options) {
    const {
      $el,
      name,
      fields,
      style,
      onValidityChange,
    } = Object.assign({}, Form.defaults, options);

    const $form = $el || document.forms[name];
    if (!$form || !($form instanceof HTMLFormElement)) {
      throw new Error(`${typeof $form} '${$form}' is not an HTMLFormElement`);
    }

    /**
     * The form element.
     *
     * @member Form#$form
     * @type {HTMLFormElement}
     */
    this.$form = $form;

    /**
     * The FormValidator containing this form.
     *
     * @member Form#parent
     * @type {FormValidator}
     */
    this.parent = parent;

    /**
     * Style specific to the form and its fields.
     *
     * @member Form#style
     * @prop {String} validClass
     * @prop {String} invalidClass
     */
    this.style = Object.assign({}, parent.style, style);

    /**
     * The fields that are controlled in this form.
     *
     * @member Form#fields
     * @type {Array.<Input>}
     */
    this.fields = this.initFields(fields);

    /**
     * Function called when validity of the form changes.
     *
     * @member Form#onValidityChange
     * @type {Function}
     */
    this.onValidityChange = onValidityChange;

    /**
     * The validity of the form.
     *
     * @member Form#valid
     * @type {Boolean}
     */
    this.valid = undefined;
  }

  initFields = fields =>
    fields.map(field => new Input(
      this,
      field,
    ));

  init = () => {
    const { fields } = this;

    fields.forEach(field => field.init());

    this.updateValidity();
  }

  updateValidity = () => {
    const { fields } = this;

    const valid = fields.reduce((formValid, field) =>
      formValid && field.valid, true);

    if (this.valid !== valid) {
      this.valid = valid;
      if (this.onValidityChange) {
        this.onValidityChange(valid);
      }
    }
  }
}

export default Form;
