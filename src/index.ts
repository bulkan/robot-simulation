import { TableTop } from "./TableTop";
import { parseCommandFile } from "./commandParser";

const main = () => {
  const commandFilePath = process.argv[2];

  if (!commandFilePath) {
    console.error("Missing argument command-file-path");
    console.error("Usage: yarn run <command-file-path>");
    process.exit(1);
  }

  const commands = parseCommandFile(commandFilePath);

  if (!commands) {
    console.error("Input file was empty");
    process.exit(1);
  }

  const tableTop = new TableTop();
  tableTop.processCommands(commands);
};

if (require.main === module) {
  main();
}
