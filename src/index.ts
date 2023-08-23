import { parseCommandFile } from "./commandParser";

const main = () => {
  const commandFilePath = process.argv[2];

  if (!commandFilePath) {
    console.log("Missing argument command-file-path");
    console.log("Usage: yarn run <command-file-path>");
    process.exit(1);
  }

  parseCommandFile(commandFilePath);
};

if (require.main === module) {
  main();
}
