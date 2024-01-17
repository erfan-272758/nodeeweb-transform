import chalk from "chalk";
import client from "scp2";
import { parseSSHConfig } from "./utils.js";

export default function scpExecute({ src, dist, opts }) {
  console.log(chalk.gray(`scp ${src} to ${dist}`));
  return new Promise((resolve, reject) => {
    client.scp(src, { ...parseSSHConfig(opts), path: dist }, (err) => {
      if (err) return reject(err);
      return resolve(true);
    });
  });
}
