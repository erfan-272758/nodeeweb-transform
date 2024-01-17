import chalk from "chalk";
import { Client } from "ssh2";
import { parseSSHConfig } from "./utils.js";

export default function remoteExecute(
  cmd,
  { logger = console.log, envs = {}, opts = {} } = {}
) {
  const sshConfigs = parseSSHConfig(opts);
  const conn = new Client();
  let data = "";
  return new Promise((resolve, reject) => {
    conn
      .on("ready", () => {
        logger(chalk.green("Client :: ready"));
        conn.exec(cmd, (err, stream) => {
          if (err) throw err;
          stream
            .on("close", (code, signal) => {
              if (code === 0) {
                logger(
                  chalk.gray(
                    "Stream :: close :: code: " + code + ", signal: " + signal
                  )
                );
                conn.end();
                return resolve(data);
              } else {
                logger(
                  chalk.red(
                    "Stream :: close :: code: " + code + ", signal: " + signal
                  )
                );
                conn.end();
                return reject(data);
              }
            })
            .on("data", (msg) => {
              data += String(msg);
              logger(chalk.gray(msg));
            })
            .stderr.on("data", (err) => {
              logger(chalk.red(String(err)));
            });
        });
      })
      .connect(sshConfigs);
  });
}
