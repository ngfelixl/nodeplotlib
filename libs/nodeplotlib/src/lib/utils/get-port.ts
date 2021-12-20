export function getPort(): number {
  const portAsString = process.env.NODEPLOTLIB_PORT;
  const port = Number(portAsString);
  if (isNaN(port)) {
    return 0;
  }
  return port;
}
