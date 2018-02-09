export default {
  defaultValidators: {
    EMPTY: value => !value.length,
    NO_EMPTY: value => value.length,
    VALUE_IN: ({ min, max }) => value => (!min || +value >= min) && (!max || +value <= max),
  },
  fromValidations: (validations, validators) => validations.map((validation) => {
    if (Array.isArray(validation)) {
      const name = validation[0];
      const params = validation[1];
      return validators[name](params);
    }
    return validators[validation];
  }),
};
