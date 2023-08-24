import { readFileSync } from "node:fs";
import { PlaceCommand, Command } from "./Command";
import { Direction, ValidCommandObject, validDirections } from "./types";

export const parseArgsForPlaceCommand = (args: string): PlaceCommand => {
  const argumentTokens = args.split(",");

  if (
    !argumentTokens ||
    argumentTokens?.length === 0 ||
    argumentTokens.length < 3
  ) {
    throw new Error("PLACE command is missing arguments");
  }

  const direction = argumentTokens[2];

  if (!validDirections.includes(direction)) {
    throw new Error(
      `PLACE command received ${direction} which is not a valid compass direction`
    );
  }

  return new PlaceCommand(
    parseInt(argumentTokens[0]),
    parseInt(argumentTokens[1]),
    argumentTokens[2] as Direction
  );
};

export const processLine = (line: string) => {
  const tokens = line.split(" ");
  const [commandString, args] = tokens;

  switch (commandString.toLowerCase()) {
    case "place":
      return parseArgsForPlaceCommand(args);
    case "report":
    case "move":
    case "left":
    case "right":
      return new Command(commandString);
    default:
      throw new Error(`Unknown command: ${commandString}`);
  }
};

// clean up the lines from the input files
const cleanLines = (lines: string[]) => {
  return lines
    .map((line) => line.trim()) // trim white space
    .filter((line) => line.length) // empty lines
    .filter((line) => !line.startsWith("#")); // comment lines
};

export const parseCommandString = (commandString: string) => {
  // split the file data into lines
  const lines = cleanLines(commandString.toString().split("\n"));

  const maybePlaceCommand = processLine(lines[0]);

  const restCommands = lines.slice(1, -1).map(processLine);

  if (!(maybePlaceCommand instanceof PlaceCommand)) {
    throw new Error("PLACE should be the first command");
  }

  return [maybePlaceCommand, ...restCommands] satisfies ValidCommandObject;
};

export const parseCommandFile = (
  commandFilePath: string
): ValidCommandObject | null => {
  const data = readFileSync(commandFilePath);

  if (!data.length) null;

  return parseCommandString(data.toString());
};
