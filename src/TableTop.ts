import { Direction, ValidCommandObject } from "./types";
import { Command, PlaceCommand } from "./Command";

export class TableTop {
  height: number;
  width: number;
  position: { x: number; y: number };
  directionFacing: Direction | undefined;

  constructor(height = 5, width = 5) {
    this.width = width;
    this.height = height;
    this.position = { x: -1, y: -1 };
  }

  placeRobot(x: number, y: number, direction: Direction) {
    this.position.x = x;
    this.position.y = y;
    this.directionFacing = direction;
  }

  setInitialRobotPosition(command: PlaceCommand) {
    let { x, y } = command.position;

    if (x > this.width || x < 0) {
      x = 0;
      y = 0;
    }

    if (y > this.height || y < 0) {
      y = 0;
      x = 0;
    }

    this.placeRobot(x, y, command.direction);
  }

  /**
   * Move the robot one unit forward in the direction it is currently facing.
   */
  move() {
    const { x, y } = this.position;
    switch (this.directionFacing) {
      case "NORTH":
        this.position.y = y + 1 < this.height ? y + 1 : y;
        break;
      case "EAST":
        this.position.x = x + 1 < this.width ? x + 1 : x;
        break;
      case "SOUTH":
        this.position.y = y - 1 >= 0 ? y - 1 : y;
        break;
      case "WEST":
        this.position.x = x - 1 >= 0 ? x - 1 : x;
        break;
    }
  }

  /**
   * Rotate 90 degrees left
   */
  left() {
    switch (this.directionFacing) {
      case "NORTH":
        this.directionFacing = "WEST";
        break;
      case "WEST":
        this.directionFacing = "SOUTH";
        break;
      case "SOUTH":
        this.directionFacing = "EAST";
        break;
      case "EAST":
        this.directionFacing = "NORTH";
        break;
    }
  }

  /**
   * Rotate 90 degrees right
   */
  right() {
    switch (this.directionFacing) {
      case "NORTH":
        this.directionFacing = "EAST";
        break;
      case "EAST":
        this.directionFacing = "SOUTH";
        break;
      case "SOUTH":
        this.directionFacing = "WEST";
        break;
      case "WEST":
        this.directionFacing = "NORTH";
        break;
    }
  }

  get currentPosition() {
    return `${this.position.x},${this.position.y},${this.directionFacing}`;
  }

  /**
   * Announce the X,Y and F of the robot through the standard output
   */
  report() {
    console.log(this.currentPosition);
  }

  processCommands(commands: ValidCommandObject) {
    if (!commands.length) return;

    // The parser will ensure first command is a PlaceCommand
    const initialCommand = commands.shift();

    if (!(initialCommand instanceof PlaceCommand)) {
      throw new Error("The first command should be PlaceCommand");
    }

    this.setInitialRobotPosition(initialCommand);

    for (let command of commands) {
      switch (command.name.toLowerCase()) {
        case "move":
          this.move();
          break;
        case "right":
          this.right();
          break;
        case "left":
          this.left();
          break;
        case "report":
          this.report();
          break;
        case "place":
          const placeCommand = command as PlaceCommand;
          const { x, y } = placeCommand.position;
          this.placeRobot(x, y, placeCommand.direction);
          break;
      }
    }
  }
}
