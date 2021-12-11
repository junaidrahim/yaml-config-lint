import { Command, flags } from "@oclif/command";
import YamlReader from "./yaml_reader";
import { JSONValidator } from "./validator";

class YamlConfigLint extends Command {
  static description = "Lint multiline data inside YAML files";

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    keys: flags.string({
      char: "k",
      description: "Keys you want to validate",
      required: true,
      multiple: true
    }),
    files: flags.string({
      char: "f",
      description: "Input File(s)",
      required: true,
      multiple: true,
    }),
  };

  async run() {
    const { flags } = this.parse(YamlConfigLint);
    const yamlReader = new YamlReader(flags.files, flags.keys);
    const jsonValidator = new JSONValidator("");
    yamlReader.run_lint(jsonValidator);
  }
}

export = YamlConfigLint;
