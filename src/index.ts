import { Command, flags } from "@oclif/command";
import YamlReader from "./yaml_reader";
import { JSONValidator } from "./validator";

class YamlConfigLint extends Command {
  static description = "describe the command here";

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    glob: flags.string({
      char: "f",
      description: "Input File Prefix",
      required: true,
    }),
    keys: flags.string({
      char: "k",
      description: "Comma separated of keys you want to validate",
      required: true,
    }),
  };

  async run() {
    const { flags } = this.parse(YamlConfigLint);
    const yamlReader = new YamlReader(flags.glob, flags.keys.split(","));
    const jsonValidator = new JSONValidator("");
    yamlReader.run_lint(jsonValidator);
  }
}

export = YamlConfigLint;
