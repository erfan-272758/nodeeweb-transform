import exec, { scp } from "../execute/index.js";
import { isRemote } from "../execute/utils.js";

export default async function dbAction(opts, cmd) {
  const options = cmd.opts();
  const parentOpts = cmd.parent.opts();

  const distUri = options.distUri || options.srcUri;
  const distDb = options.distDb || options.srcDb;

  const path = `/tmp/nwt/${options.srcDb}`;

  //   dump
  const dumpCmd = `mongodump --uri ${options.srcUri} --db ${options.srcDb} --out ${path}`;
  await exec({ cmd: dumpCmd, opts: parentOpts });

  // copy
  if (isRemote(parentOpts))
    await scp({ src: path, dist: path, opts: parentOpts });

  // restore
  const restoreCmd = `mongorestore --drop --db ${distDb} ${distUri} ${path} `;
  await exec({ cmd: restoreCmd, opts: parentOpts });
}
