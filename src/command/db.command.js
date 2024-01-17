import dbAction from "./db.action.js";

export default function registerDBCommand(cli) {
  cli
    .command("db")
    .description("transform db")
    .requiredOption("--src-uri <src-db-uri>", "source db connection")
    .option(
      "--dist-uri <dist-db-uri>",
      "dist db connection, default is same as source db name"
    )
    .requiredOption("--src-db <src-db>", "source database name")
    .option(
      "--dist-db <dist-db>",
      "dist database name, default is same as source db name"
    )
    .action(dbAction);
}
