import { readFileSync } from "node:fs";
import { PlaceCommand, Command } from "./Command";

export const processLine = (line: string) => {
  const tokens = line.split(" ");
  const [commandString, args] = tokens;

  switch (commandString.toLowerCase()) {
    case "place":
      return new PlaceCommand(args);
    case "report":
    case "move":
    case "left":
    case "right":
      return new Command(commandString);
    default:
      throw new Error(`Unknown command: ${commandString}`);
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
