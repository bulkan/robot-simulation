import { Direction } from "./types";

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
  direction: Direction;

  constructor(x: number, y: number, direction: Direction) {
    super("PLACE");

    this.position = {
      x,
      y,
    };

    this.direction = direction;
  }
}
