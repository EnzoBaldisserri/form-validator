# form-validator
A pure javascript form validator.

## Table of contents
- [Installation](#installation)
- [Documentation](#documentation)
  - [Validator class](#validator)
  - [Validators list](#validators-list)
  - [Input types](#input-types)

## Installation
- Download `lib/FormValidator.js` or `lib/FormValidator.min.js`.
- Link it in a script tag in your page before the script initializing it

The library has not been tested as a component and is not published on npm.
However, it was built using webpack with UMD as target, so it can probably be used as one.

## Documentation
The `FormValidator` files exports two objects :
```javascript
var Validator = FormValidator.Validator;
var InputTypes = FormValidator.InputTypes;
```

### Validator
Initializing the validator is pretty simple, here's the outline:
```javascript
new Validator({
  fields,
  validators,
  style,
  onValidityChange
})
```

#### `fields`
Array of input with the validators they require to be valid.
```javascript
fields: [
  {
    $el:           null,             // The input field
    type:          InputTypes.NONE,  // The type of the input
    validations:   [],               // The validations to make $el valid
    style: {
      validClass:    null,           // Class applied when input is valid
      invalidClass:  null            // Class applied when input is invalid
    },
    onInit:        null,             // Called at the initialization of the field
    onChange:      null,             // Called when the value of the field changes
  },
  ...
]
```

##### **REQUIRED** `$el`
The element containing the value of the field.
It must be either an &lt;input&gt; or a &lt;textarea&gt; html element.

##### `type`
The type of the field. If not given, the type will be taken from the `type` attribute if there is one,
else it defaults to [InputTypes.NONE](#itypes-none).

##### `validations`
The validations that are required for the field to be valid.

Shape of the parameter:
```javascript
  [
    'validationName1',                      // Without parameters
    ['validationName2', validationParams2]  // Parametrized validations
  ]
```

##### <a name="field-style"></a>`style`
The style to be applied specifically to this element.
If not set, it is herited from the global form style (see [form style](#form-style)).

##### `onInit(value, properties)`
Called when initializing the field.
Returning `false` or setting `onInit` to `false` will prevent from applying validity classes to the element.

##### `onChange(event, value, properties)`
Called when the value of the field changes.
Returning `false` will remove the validity classes from the element

The `properties` argument for both `onInit` and `onChange` has this shape:
  - `isValid`: Whether the input is valid or not
  - `valids`: List of successfully passed validators
  - `invalids`: List of unsuccessfully passed validators

#### `validators`
Object containing custom validators that can be used to validate your inputs.
They can be used them the same way as predefined validators (see [validations](#-validations-)).

Shape of the parameter:
```javascript
// ES5 Syntax
{
  simpleValidator: function(value) { ... },
  parametrizedValidator: function(params) {
    return function(value) {
      ...
    }
  }
}

// ES6 / ES2015 Syntax
{
  simpleValidator: (value) => { ... },
  parametrizedValidator: (params) => (value) => { ... }
}
```
The functions can return any value that can be interpreted as `true` or `false`.
A truthy value means the validation has passed, meanwhile a falsy value means the value isn't valid according to the validator.

#### <a name="form-style"></a>`style`
Global style for the form.
Setting a parameter to `null` will prevent the class associated to be applied.
Can be overrided by [field specific style](#field-style).
```javascript
style: {
  validClass: 'valid',     // Class to be applied when a field value is valid
  invalidClass: 'invalid'  // Class to be applied when a field value is invalid
}
```

#### `onValidityChange`
Callback function for when the state of the form (valid or invalid) changes.
```javascript
onValidityChange: function(isFormValid) { ... }
```

## Validators list
"The validator checks if ..."

### Unparametrized
- <a name="validation-email"></a>`EMAIL` - The value is a valid e-mail adress
- <a name="validation-empty"></a>`EMPTY` - The value is empty
- <a name="validation-not-empty"></a>`NOT_EMPTY` - The value isn't empty


### Parametrized
All the parameters must be assigned in objects with the name given behind.

All parameters are optional.

- <a name="validation-value-in"></a>`VALUE_IN ({ min, max })` - The value is between `min` and `max`.
- `DATE_BETWEEN ({ min, max })` - The date is between `min` and `max`.
- `CHARACTERS ({ count, min, max })` - The values contains exactly `count` characters or more than `min` characters and less than `max` characters. `count` has priority over the other parameters.
- `SPECIAL_CHARACTERS ({ count, min, max })` - The values contains exactly `count` special characters or more than `min` special characters and less than `max` special characters. `count` has priority over the other parameters.
- `LETTERS ({ count, min, max })` - The values contains exactly `count` letters or more than `min` letters and less than `max` letters. `count` has priority over the other parameters.
- `UPPERCASES ({ count, min, max })` - The values contains exactly `count` uppercase letter or more than `min` uppercase letter and less than `max` uppercase letter. `count` has priority over the other parameters.
- `LOWERCASES ({ count, min, max })` - The values contains exactly `count` lowercase letter or more than `min` lowercase letter and less than `max` lowercase letter. `count` has priority over the other parameters.
- `NUMBERS ({ count, min, max })` - The values contains exactly `count` digits or more than `min` digits and less than `max` digits. `count` has priority over the other parameters.

## Input types
`InputTypes` can be set manually or automatically via the `type` attribute. They may have default validations.

- <a name="itypes-none"></a>`NONE` - No default validation
- `EMPTY` - [EMPTY](#validation-empty)
- `TEXT` - [NOT_EMPTY](#validation-not-empty)
- `EMAIL` - [NOT_EMPTY](#validation-not-empty), [EMAIL](#validation-email)
- `PASSWORD` - [NOT_EMPTY](#validation-not-empty)
- `NUMBER` - [NOT_EMPTY](#validation-not-empty)
- `POSITIVE_NUMBER` - [NOT_EMPTY](#validation-not-empty), [VALUE_IN({ min: 0 })](#validation-value-in)
- `DATE` - [NOT_EMPTY](#validation-not-empty)
- `TIME` - [NOT_EMPTY](#validation-not-empty)
- `DATETIME` - [NOT_EMPTY](#validation-not-empty)
