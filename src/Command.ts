const validCommands = ["move", "place", "left", "right"];

type ValidCommands = (typeof validCommands)[number];

export class Command {
  name: string;

  constructor(name: ValidCommands) {
    this.name = name;
  }
}

export class PlaceCommand extends Command {
  position: { x: number; y: number };
  direction: string;

  constructor(name: ValidCommands, args: string) {
    super(name);

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
