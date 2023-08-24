import { type Command, type PlaceCommand } from "./Command";

export const validDirections = ["NORTH", "EAST", "SOUTH", "WEST"];

export type Direction = (typeof validDirections)[number];

export type ValidCommandObject = [PlaceCommand, ...Command[]];
