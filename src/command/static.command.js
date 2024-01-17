import staticAction from "./static.action.js";

export default function registerStaticCommand(cli) {
  cli
    .command("static")
    .description("transform static files")
    .argument("<src>", "source path")
    .argument("<dist>", "destination path")
    .action(staticAction);
}
