import { readFileSync } from "node:fs";
import { parseCommandFile, parseCommandString } from "./commandParser";

jest.mock("node:fs");

const validInputFile = `
PLACE 0,0,NORTH
 MOVE  
    REPORT    



# 0,1,NORTH
`;

describe("parseCommandFile", () => {
  it("describe should handle valid inputs", () => {
    (readFileSync as jest.Mock).mockReturnValue(Buffer.from(validInputFile));

    expect(parseCommandFile("foo/bar")).toMatchInlineSnapshot(`
      [
        Command {
          "args": [
            "0,0,NORTH",
          ],
          "name": "PLACE",
        },
        Command {
          "args": undefined,
          "name": "MOVE",
        },
        Command {
          "args": undefined,
          "name": "REPORT",
        },
      ]
    `);
  });
});

describe("parseCommandString", () => {
  const testTable = [[0, "Sunday"]];

  it("should throw if input contains unknown command", () => {
    expect(
      parseCommandString(`
        PLACE 0,0,NORTH
        MOVE
        MOVE 
        # WAT
    `)
    ).toThrow("Unknown command: WAT");
  });
});
