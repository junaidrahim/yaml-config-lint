// Read Yaml -> Pick out keys -> run validation on the content of those keys

import { glob } from "glob";
import * as YAML from "yaml";
import { Validator } from "./validator";
import * as fs from "fs";
const colors = require("colors/safe");

class YamlReader {
  input_glob: string;
  keys: Array<string>;

  constructor(input_glob: string, keys: Array<string>) {
    this.input_glob = input_glob;
    this.keys = keys;
  }

  run_lint(validator: Validator) {
    console.log(colors.bold("Running YAML Config Lint: \n"));
    glob(this.input_glob, (err, filesArr) => {
      if (err) throw err;

      let errCount = 0;
      filesArr.forEach((filePath) => {
        const data = fs.readFileSync(filePath).toString();
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
            if(validator.validate(value.toString(), filePath))
              errCount += 1;
          }
        });
      });

      if (errCount > 0)
        process.exit(1);
    });
  }
}

export default YamlReader;
