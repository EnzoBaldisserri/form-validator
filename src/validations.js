function regexMatchCounter(input, regex) {
  const globalRegex = new RegExp(regex, 'g');
  const matches = input.match(globalRegex);

  return matches === null ? 0 : matches.length;
}

function defaultRegexCountValidation(input, params, regex) {
  const matchCount = regexMatchCounter(input, regex);
  const { count, min, max } = params;

  if (count !== undefined) {
    return matchCount === count;
  }
  return (min === undefined || matchCount >= min) && (max === undefined || matchCount <= max);
}

class Validation {
  constructor(repr, validate) {
    if (typeof validate !== 'function') {
      throw new Error(`${typeof validate} '${validate}' isn't a function`);
    }

    this.repr = repr;
    this.validate = validate;
  }
}

const Validations = {
  new: (name, validate) => {
    const newValidation = {
      [name]: (params, repr) => new Validation(
        repr || name,
        validate(params),
      ),
    };

    Object.assign(
      Validations,
      newValidation,
    );
  },
  CHARACTERS: ({ count, min, max }, repr) => new Validation(
    repr || 'CHARACTERS',
    value => (
      count !== undefined
        ? value.length === count
        : (min === undefined || value.length >= min) && (max === undefined || value.length <= max)
    ),
  ),
  DATE_BETWEEN: ({ min, max }, repr) => new Validation(
    repr || 'DATE_BETWEEN',
    (value) => {
      const date = new Date(value);
      return (min === undefined || min < date) && (max === undefined || date < max);
    },
  ),
  EMAIL: repr => new Validation(
    repr || 'EMAIL',
    value => /\S+@\S+\.\S+/.test(value),
  ),
  EMPTY: repr => new Validation(
    repr || 'EMPTY',
    value => !value.length,
  ),
  LETTERS: (params, repr) => new Validation(
    repr || 'LETTERS',
    value => defaultRegexCountValidation(value, params, /[A-Za-z]/),
  ),
  LOWERCASES: (params, repr) => new Validation(
    repr || 'LOWERCASES',
    value => defaultRegexCountValidation(value, params, /[a-z]/),
  ),
  MATCH: ({ regex }, repr) => new Validation(
    repr || 'MATCH',
    value => new RegExp(regex, '').test(value),
  ),
  NOT_EMPTY: repr => new Validation(
    repr || 'NOT_EMPTY',
    value => !!value.length,
  ),
  NUMBERS: (params, repr) => new Validation(
    repr || 'NUMBERS',
    value => defaultRegexCountValidation(value, params, /\d/),
  ),
  SPECIAL_CHARACTERS: (params, repr) => new Validation(
    repr || 'SPECIAL_CHARACTERS',
    value => defaultRegexCountValidation(value, params, /[^A-Za-z0-9]/),
  ),
  UPPERCASES: (params, repr) => new Validation(
    repr || 'UPPERCASES',
    value => defaultRegexCountValidation(value, params, /[A-Z]/),
  ),
  VALUE_IN: ({ min, max }, repr) => new Validation(
    repr || 'VALUE_IN',
    value => (min === undefined || +value >= min) && (max === undefined || +value <= max),
  ),
};

export {
  Validations,
  Validation,
};
