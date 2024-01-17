import localExecute from "./local.execute.js";
import remoteExecute from "./remote.execute.js";
import scpExecute from "./scp.execute.js";
import { isRemote } from "./utils.js";

export default async function exec({ cmd, opts }) {
  if (isRemote(opts)) return await remoteExecute(cmd, { opts });
  else return await localExecute(cmd);
}

export async function scp({ src, dist, opts }) {
  return await scpExecute({ src, dist, opts });
}
