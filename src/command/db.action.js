import exec, { scp } from "../execute/index.js";
import { isRemote } from "../execute/utils.js";

export default async function dbAction(opts, cmd) {
  const options = cmd.opts();
  const parentOpts = cmd.parent.opts();

  const distUri = options.distUri || options.srcUri;
  const distDb = options.distDb || options.srcDb;

  const path = `/tmp/nwt`;

  //   dump
  const dumpCmd = `mongodump --uri ${options.srcUri} --db ${options.srcDb} --out ${path}`;
  await exec({ cmd: dumpCmd, opts: {} });

  // copy
  if (isRemote(parentOpts))
    await scp({ src: path, dist: path, opts: parentOpts });

  // restore
  const restoreCmd = `mongorestore --drop --db ${distDb} ${distUri} ${path}/${options.srcDb} `;
  await exec({ cmd: restoreCmd, opts: parentOpts });

  // remove local tmp
  await exec({ cmd: `rm -r ${path}`, opts: {} });
  // remove remote temp
  if (isRemote(parentOpts))
    await exec({ cmd: `rm -r ${path}`, opts: parentOpts });
}
