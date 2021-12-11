interface Validator {
  schema: null | string;
  validate: (input: string, fileName: string) => boolean;
}

export default Validator;
