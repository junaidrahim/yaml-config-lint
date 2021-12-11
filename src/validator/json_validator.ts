import Validator from "./validator";
const jsonlint = require("jsonlint-mod");
const colors = require("colors/safe");

class JSONValidator implements Validator {
  schema: string;

  constructor(schema: string) {
    this.schema = schema;
  }

  validate(input: string, fileName: string) {
    try {
      // will add schema based validation here too
      jsonlint.parse(input);
      console.log(`✅ ${colors.yellow("jsonlint successful")}: ${fileName}`);
      return false;
    } catch (err) {
      console.log(colors.red("jsonlint error in:"), colors.bold(fileName));
      console.log(err.message, "\n");
      return true;
    }
  }
}

export default JSONValidator;
