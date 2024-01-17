import cli from "./src/cli/index.js";
import registerDBCommand from "./src/command/db.command.js";
import registerStaticCommand from "./src/command/static.command.js";

function main() {
  //   register
  registerDBCommand(cli);
  registerStaticCommand(cli);

  // parse
  cli.parse(process.argv);
}

main();
