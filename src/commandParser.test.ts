import { readFileSync } from "node:fs";
import { parseCommandFile, parseCommandString } from "./commandParser";

jest.mock("node:fs");

const validInputFile = `
PLACE 0,0,NORTH
 MOVE  
  # this should be ignored

    REPORT  
PLACE 1,2,SOUTH  



# 0,1,NORTH
`;

describe("parseCommandFile", () => {
  it("describe should handle valid inputs", () => {
    (readFileSync as jest.Mock).mockReturnValue(Buffer.from(validInputFile));

    expect(parseCommandFile("foo/bar")).toMatchInlineSnapshot(`
      [
        PlaceCommand {
          "direction": "NORTH",
          "name": "PLACE",
          "position": {
            "x": 0,
            "y": 0,
          },
        },
        Command {
          "name": "MOVE",
        },
        Command {
          "name": "REPORT",
        },
        PlaceCommand {
          "direction": "SOUTH",
          "name": "PLACE",
          "position": {
            "x": 1,
            "y": 2,
          },
        },
      ]
    `);
  });
});

describe("parseCommandString", () => {
  it("should validate that first command is always PLACE", () => {
    expect(() => parseCommandString(`MOVE`)).toThrow(
      "PLACE should be the first command"
    );
  });

  it("should throw if input contains unknown command", () => {
    expect(() =>
      parseCommandString(`
        PLACE 0,0,NORTH
        MOVE
        MOVE 
        WAT
    `)
    ).toThrow("Unknown command: WAT");
  });
});
