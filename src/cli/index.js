import { Command } from "commander";

const cli = new Command("nwt");

const arrayAdd = (value, prev) => {
  prev.push(value);
  return prev;
};

cli
  .description("for transform nodeeweb")
  .version("1.0.0")
  .option("--remote <ssh-uri>", "destination remote connection");

export default cli;
