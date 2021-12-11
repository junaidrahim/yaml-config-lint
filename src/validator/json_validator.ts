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
      jsonlint.parse(input);
      console.log(`✅ ${colors.yellow("jsonlint successful")}: ${fileName}`);
      return true;
    } catch (err) {
      console.log(colors.red("jsonlint error in:"), colors.bold(fileName));
      console.log(err.message, "\n");
      return false;
    }
  }
}

export default JSONValidator;
