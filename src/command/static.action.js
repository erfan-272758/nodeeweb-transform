import * as fs from "fs";
import chalk from "chalk";
import { scp } from "../execute/index.js";
import { isRemote } from "../execute/utils.js";

export default async function staticAction(src, dist, opts, cmd) {
  const parentOpts = cmd.parent.opts();
  if (isRemote(parentOpts)) {
    await scp({ src, dist, opts: parentOpts });
  } else await fs.promises.cp(src, dist);
  console.log(chalk.green("successfully copy static files"));
}
