import { readFileSync } from "node:fs";

const validCommands = ["move", "place", "left", "right"];

type ValidCommands = (typeof validCommands)[number];

class Command {
  name: string;
  args: string | undefined;

  constructor(name: ValidCommands, args?: string) {
    this.name = name;
    this.args = args;
  }
}

class PlaceCommand extends Command {
  position: { x: number; y: number };
  direction: string;

  constructor(name: ValidCommands, args: string) {
    super(name, args);

    this.name = name;

    const argumentTokens = args.split(",");

    if (
      !argumentTokens ||
      argumentTokens?.length === 0 ||
      argumentTokens.length < 3
    ) {
      throw new Error("PLACE command is missing arguments");
    }

    this.position = {
      x: parseInt(argumentTokens[0]),
      y: parseInt(argumentTokens[1]),
    };
    this.direction = argumentTokens[2];
  }
}

export const processLine = (line: string) => {
  const tokens = line.split(" ");
  const [command, args] = tokens;

  switch (command.toLowerCase()) {
    case "place":
      return new PlaceCommand(command, args);
    case "report":
    case "move":
    case "left":
    case "right":
      return new Command(command);
    default:
      throw new Error(`Unknown command: ${command}`);
  }
};

const cleanLines = (lines: string[]) => {
  return lines
    .map((line) => line.trim()) // trim white space
    .filter((line) => line.length) // empty lines
    .filter((line) => !line.startsWith("#")); // comment lines
};

export const parseCommandString = (commandString: string): Command[] => {
  // split the file data into lines and process

  const lines = commandString.toString().split("\n");
  const commands = cleanLines(lines).map(processLine);

  if (commands?.[0].name.toLowerCase() !== "place") {
    throw new Error("PLACE should be the first command");
  }

  return commands;
};

export const parseCommandFile = (commandFilePath: string): Command[] => {
  const data = readFileSync(commandFilePath);

  if (!data.length) return [];

  return parseCommandString(data.toString());
};
