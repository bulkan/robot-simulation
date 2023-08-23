import { Command, PlaceCommand } from "./Command";
import { TableTop } from "./TableTop";

describe("TableTop", () => {
  describe("describe when PLACEing the robot", () => {
    it("if initial placement is out of bounds it should start at 0,0", () => {
      const tableTop = new TableTop();
      const place = new PlaceCommand("6,2,NORTH");

      tableTop.setInitialRobotPosition(place);

      expect(tableTop.currentPosition).toEqual("0,0,NORTH");
    });
  });

  describe("MOVE", () => {
    const moveCommands = Array.from({ length: 10 }, () => new Command("MOVE"));

    it.each`
      initialPosition | direction  | expectedResult
      ${"0,0"}        | ${"NORTH"} | ${"0,4,NORTH"}
      ${"0,4"}        | ${"SOUTH"} | ${"0,0,SOUTH"}
      ${"0,4"}        | ${"EAST"}  | ${"4,4,EAST"}
      ${"4,4"}        | ${"WEST"}  | ${"0,4,WEST"}
    `(
      `when initial position is $initialPosition and direction is $direction it should result in $expectedResult`,
      ({ initialPosition, direction, expectedResult }) => {
        const tableTop = new TableTop();
        const commands = [
          new PlaceCommand(`${initialPosition},${direction}`),
          ...moveCommands,
        ];

        tableTop.processCommands(commands);
        expect(tableTop.currentPosition).toEqual(expectedResult);
      }
    );
  });
});
