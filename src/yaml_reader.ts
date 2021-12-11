import * as YAML from "yaml";
import { Validator } from "./validator";
import * as fs from "fs";
const colors = require("colors/safe");

class YamlReader {
  files: Array<string>;
  keys: Array<string>;

  constructor(files: Array<string>, keys: Array<string>) {
    this.files = files;
    this.keys = keys;
  }

  run_lint(validator: Validator) {
    console.log(colors.bold("Running YAML Config Lint: \n"));

    let errCount = 0;
    this.files.forEach((filePath) => {
      const data = fs.readFileSync(filePath).toString();
      try {
        const yamlData = YAML.parse(data);
        this.keys.forEach((key) => {
          let value = yamlData;
  
          let flag = false;
          for (let k of key.split(".")) {
            if (value[k]) {
              value = value[k];
              flag = true;
            } else {
              flag = false;
              break;
            }
          }
  
          if (flag) {
            if (validator.validate(value.toString(), filePath)) errCount += 1;
          }
        });
      } catch (err) {
        return
      }

    });

    if (errCount > 0) process.exit(1);
  }
}

export default YamlReader;
