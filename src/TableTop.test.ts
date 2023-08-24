import { Command, PlaceCommand } from "./Command";
import { TableTop } from "./TableTop";
import { ValidCommandObject } from "./types";

describe("TableTop", () => {
  describe("describe when PLACEing the robot", () => {
    it("should always start at (0,0) when initial placement is out of bounds", () => {
      const tableTop = new TableTop();
      const place = new PlaceCommand(6, 2, "NORTH");

      tableTop.setInitialRobotPosition(place);

      expect(tableTop.currentPosition).toEqual("0,0,NORTH");
    });
  });

  describe("MOVE behaves as expected", () => {
    const moveCommands = Array.from({ length: 10 }, () => new Command("MOVE"));

    it.each`
      x    | y    | direction  | expectedResult
      ${0} | ${0} | ${"NORTH"} | ${"0,4,NORTH"}
      ${0} | ${4} | ${"SOUTH"} | ${"0,0,SOUTH"}
      ${0} | ${4} | ${"EAST"}  | ${"4,4,EAST"}
      ${4} | ${4} | ${"WEST"}  | ${"0,4,WEST"}
    `(
      `when initial position = "$initialPosition" & direction = "$direction" it should result in $expectedResult`,
      ({ x, y, direction, expectedResult }) => {
        const tableTop = new TableTop();
        const commands: ValidCommandObject = [
          new PlaceCommand(x, y, direction),
          ...moveCommands,
        ];

        tableTop.processCommands(commands);
        expect(tableTop.currentPosition).toEqual(expectedResult);
      }
    );
  });

  it.each`
    initialDirection | turnCount | turnDirection | expectedResult
    ${"NORTH"}       | ${4}      | ${"LEFT"}     | ${"0,0,NORTH"}
    ${"NORTH"}       | ${3}      | ${"LEFT"}     | ${"0,0,EAST"}
    ${"NORTH"}       | ${2}      | ${"LEFT"}     | ${"0,0,SOUTH"}
    ${"NORTH"}       | ${1}      | ${"LEFT"}     | ${"0,0,WEST"}
    ${"EAST"}        | ${4}      | ${"RIGHT"}    | ${"0,0,EAST"}
    ${"EAST"}        | ${3}      | ${"RIGHT"}    | ${"0,0,NORTH"}
    ${"EAST"}        | ${2}      | ${"RIGHT"}    | ${"0,0,WEST"}
    ${"EAST"}        | ${1}      | ${"RIGHT"}    | ${"0,0,SOUTH"}
  `(
    `when starting direction = "$initialDirection" then after $turnCount turns direction should be $expectedResult`,
    ({ initialDirection, turnCount, turnDirection, expectedResult }) => {
      const tableTop = new TableTop();
      const commands: ValidCommandObject = [
        new PlaceCommand(0, 0, initialDirection),
        ...Array.from({ length: turnCount }, () => new Command(turnDirection)),
      ];

      tableTop.processCommands(commands);

      expect(tableTop.currentPosition).toEqual(expectedResult);
    }
  );
});
