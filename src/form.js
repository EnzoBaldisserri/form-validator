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

  initFields = (fields) => {
    // If fields isn't defined, get all fields of the form
    const controlled = fields.length
      ? fields
      : Array.of(...this.$form.elements).filter(el =>
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement);

    // If there's one unique field
    if (!Array.isArray(controlled)) {
      return [
        FormField.initFormField(this, controlled),
      ];
    }

    return controlled.map(field => FormField.initFormField(this, field));
  }

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

  static initForm = (parent, formProps) => {
    if (typeof formProps === 'string' || typeof form === 'number') {
      return new Form(parent, { name: formProps });
    }

    if (formProps instanceof HTMLElement) {
      return new Form(parent, { $el: formProps });
    }

    return new Form(parent, formProps);
  }
}

export default Form;
