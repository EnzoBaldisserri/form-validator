import FormField from './formfield';

/**
 * Representation of a controlled form element.
 * @class
 */
class Form {
  static defaults = {
    $el: null,
    name: null,
    fields: [],
    submit: null,
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
      submit,
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
     * The submit button of the form.
     * It is enabled when all the fields are valid.
     *
     * @member Form#$submit
     * @type {HTMLButtonElement|HTMLInputElement}
     */
    this.$submit = this.initSubmit(submit);

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
     * @type {Array.<FormField>}
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

  initSubmit = (submit) => {
    if (submit === true) {
      return this.$form.querySelector('[type=submit]');
    }

    if (typeof submit === 'string' || typeof submit === 'number') {
      return this.$form.elements[submit];
    }

    if (submit instanceof HTMLButtonElement || submit instanceof HTMLInputElement) {
      if (submit.type !== 'submit') {
        throw new Error(`Button or input ${submit} isn't of type 'submit'`);
      }

      if (submit.form !== this.$form) {
        throw new Error(`Submit button or input ${submit} isn't part of the form it's associated to.`);
      }

      return submit;
    }

    return null;
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
    const { fields, $submit } = this;

    const valid = fields.reduce((formValid, field) =>
      formValid && field.valid, true);

    if (this.valid !== valid) {
      this.valid = valid;

      if ($submit) {
        $submit.disabled = !valid;
      }

      if (this.onValidityChange) {
        this.onValidityChange(valid);
      }
    }
  }
}

export default Form;
