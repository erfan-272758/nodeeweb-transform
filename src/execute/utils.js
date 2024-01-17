export function isRemote(opts) {
  const remote = opts.remote;
  if (!remote) return false;
  try {
    new URL(remote);
    return true;
  } catch (error) {
    return false;
  }
}

export function parseSSHConfig(opts) {
  const url = new URL(opts.remote);
  return {
    host: url.hostname,
    port: +(url.port || 22),
    username: url.username,
    password: url.password,
  };
}
