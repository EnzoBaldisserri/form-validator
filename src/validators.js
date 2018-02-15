const defaultValidators = {
  EMPTY: value => !value.length,
  NO_EMPTY: value => value.length,
  VALUE_IN: ({ min, max }) => value => (!min || +value >= min) && (!max || +value <= max),
};

const fromValidations = (validations = [], validators = defaultValidators) => {
  const obj = {};
  validations.forEach((validation) => {
    if (Array.isArray(validation)) {
      const [name, params] = validation;
      Object.assign(obj, {
        [name]: validators[name](params),
      });
    } else {
      Object.assign(obj, {
        [validation]: validators[validation],
      });
    }
  });
  return obj;
};

export {
  defaultValidators,
  fromValidations,
};
