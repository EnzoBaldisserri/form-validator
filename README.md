# form-validator
A pure javascript form validator.

## Table of contents
- [Installation](#installation)
- [Documentation](#documentation)
  - [Validator](#validator)
  - [Validators list](#validators-list)
  - [Input types](#input-types)

## Installation
- Download <code>lib/FormValidator.js</code> or <code>lib/FormValidator.min.js</code>.
- Link it in a script tag in your page before the script initializing it

The library has not been tested as a component and is not published on npm. However, it was built using webpack with UMD as target, so it can probably be used as one.

## Documentation
The <code>FormValidator</code> files exports two objects :
```js
var Validator = FormValidator.Validator;
var InputTypes = FormValidator.InputTypes;
```

### Validator
Initializing the validator is pretty simple, here's the outline:
```js
new Validator({
  fields,
  validators,
  style,
  onValidityChange
})
```

#### <code>fields</code>
Array of input with the validators they require to be valid.
```js
fields: [
  field1,
  field2,
  ...
]
```
Each field is made of the following attributes:
- <code>**el** { HTMLInputElement }</code> - The HTML input element
- <code>**type** { InputType|String }</code> - The type of the field. If not given, the type will be guessed from the <code>type</code> attribute of the element (Optional)
- <code>**validations** { Array.&lt;String|Array&gt; }</code> - Array of validations (Optional)
  ```
  [
    'validationName',                     // Unparametrized
    ['validationName', validationParams]  // Parametrized
  ]
```
- <code>**style** { Object }</code> - The style to be applied specifically to this element (see [form style](#style)) (Optional)
- <code>**onInit (value, properties)** { Function|Boolean }</code> - Called when initializing the field. Returning <code>false</code> or setting parameter to <code>false</code> will prevent from applying validity classes to the input element. (Optional)
- <code>**onChange (event, value, properties)** { Function }</code> - Called when the value of the field has changed. Returning <code>false</code> will remove the validity classes from the element (Optional)

  The **properties** argument for both <code>onInit</code> and <code>onChange</code> is formed this way:
    - <code>**isValid**</code>: Whether the input is valid or not
    - <code>**valids**</code>: List of successfully passed validators
    - <code>**invalids**</code>: List of unsuccessfully passed validators

#### <a name="validators"></a><code>validators</code>
Object containing custom validators that can be used to validate your inputs.
```js
validators: {
  simpleValidator: function(value) { ... }
  parametrizedValidator: function(params) {
    return function(value) {
      ...
    }
  }
}
```
The function can return any value that can be interpreted as <code>true</code> or <code>false</code>. A truthy value means the validation has passed, a falsy value means the value isn't valid according to the validator.

In fields, they can be used them the same way as the predefined validators.

#### <a name="style"></a><code>style</code>
Object containing generic style for the form.
```js
style: {
  validClass,
  invalidClass,
}
```
- <code>**validClass** { String }</code> - Class to be applied to an input when its value is valid
- <code>**invalidClass** { String }</code> - Class to be applied to an input its value is invalid

#### <code>onValidityChange</code>
Callback function for when the state of the form (valid or invalid) changes.
```js
onValidityChange: function(isFormValid) { ... }
```

## Validators list
"The validator checks if ..."

### Unparametrized
- <a name="validation-email"></a><code>**EMAIL**</code> - The value is a valid e-mail adress
- <a name="validation-empty"></a><code>**EMPTY**</code> - The value is empty
- <a name="validation-not-empty"></a><code>**NOT_EMPTY**</code> - The value isn't empty


### Parametrized
All the parameters must be assigned in objects with the name given behind.

All parameters are optional.

- <a name="validation-value-in"></a><code>**VALUE_IN (min, max)**</code> - The value is between <code>min</code> and <code>max</code>.
- <code>**DATE_BETWEEN (min, max)**</code> - The date is between <code>min</code> and <code>max</code>.
- <code>**CHARACTERS (count, min, max)**</code> - The values contains exactly <code>count</code> characters or more than <code>min</code> characters and less than <code>max</code> characters. <code>count</code> has priority over the other parameters.
- <code>**SPECIAL_CHARACTERS (count, min, max)**</code> - The values contains exactly <code>count</code> special characters or more than <code>min</code> special characters and less than <code>max</code> special characters. <code>count</code> has priority over the other parameters.
- <code>**LETTERS (count, min, max)**</code> - The values contains exactly <code>count</code> letters or more than <code>min</code> letters and less than <code>max</code> letters. <code>count</code> has priority over the other parameters.
- <code>**UPPERCASES (count, min, max)**</code> - The values contains exactly <code>count</code> uppercase letter or more than <code>min</code> uppercase letter and less than <code>max</code> uppercase letter. <code>count</code> has priority over the other parameters.
- <code>**LOWERCASES (count, min, max)**</code> - The values contains exactly <code>count</code> lowercase letter or more than <code>min</code> lowercase letter and less than <code>max</code> lowercase letter. <code>count</code> has priority over the other parameters.
- <code>**NUMBERS (count, min, max)**</code> - The values contains exactly <code>count</code> digits or more than <code>min</code> digits and less than <code>max</code> digits. <code>count</code> has priority over the other parameters.

## Input types
<code>InputTypes</code> can be set manually or automatically via the <code>type</code> attribute. They have default validations.

- <code>**NONE**</code> - No default validation
- <code>**EMPTY**</code> - [EMPTY](#validation-empty)
- <code>**TEXT**</code> - [NOT_EMPTY](#validation-not-empty)
- <code>**EMAIL**</code> - [NOT_EMPTY](#validation-not-empty), [EMAIL](#validation-email)
- <code>**PASSWORD**</code> - [NOT_EMPTY](#validation-not-empty)
- <code>**NUMBER**</code> - [NOT_EMPTY](#validation-not-empty)
- <code>**POSITIVE_NUMBER**</code> - [NOT_EMPTY](#validation-not-empty), [VALUE_IN({ min: 0 })](#validation-value-in)
- <code>**DATE**</code> - [NOT_EMPTY](#validation-not-empty)
- <code>**TIME**</code> - [NOT_EMPTY](#validation-not-empty)
- <code>**DATETIME**</code> - [NOT_EMPTY](#validation-not-empty)
