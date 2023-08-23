import { readFileSync } from "node:fs";
import { pipe } from "remeda";

const validCommands = ["move", "place", "left", "right"];

type ValidCommands = (typeof validCommands)[number];

class Command {
  name: string;
  args: string[] | undefined;

  constructor(name: ValidCommands, args?: string[]) {
    this.name = name;
    this.args = args;
  }
}

export const processLine = (line: string) => {
  const tokens = line.split(" ");
  const [command, ...args] = tokens;

  switch (command.toLowerCase()) {
    case "place":
      return new Command(command, args);
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
    .filter((line) => line.length) // empty lines
    .map((line) => line.trim()) // trim white space
    .filter((line) => !line.startsWith("#")); // comment lines
};

const validateCommands = (commands: Command[]) => {
  const isPlaceCommandFirst = () => commands?.[0].name === "place";

  return pipe(commands, isPlaceCommandFirst);
};

export const parseCommandString = (commandString: string): Command[] => {
  // split the file data into lines and process
  const commands = pipe(
    commandString.toString().split("\n"),
    cleanLines,
    (lines) => lines.map(processLine)
  );

  return commands;
};

export const parseCommandFile = (commandFilePath: string): Command[] => {
  const data = readFileSync(commandFilePath);

  if (!data.length) return [];

  return parseCommandString(data.toString());
};
