import { calculate, convert_to_operation } from "..";
import { describe, test, expect } from "bun:test";

describe("Caclculate function", () => {
  /** add **/
  test("returns 4 when passed add and [2,2]", () => {
    const res = calculate("add", [2, 2]);
    expect(res).toEqual(4);
  });
  test("returns 8 when passed add and [2,2,2,2]", () => {
    const res = calculate("add", [2, 2, 2, 2]);
    expect(res).toEqual(8);
  });

  /** subtract **/
  test("returns 2 when passed subtract and [4,2]", () => {
    const res = calculate("subtract", [4, 2]);
    expect(res).toEqual(2);
  });
  test("returns 2 when passed subtract and [8,2,2,2]", () => {
    const res = calculate("subtract", [8, 2, 2, 2]);
    expect(res).toEqual(2);
  });

  /** divide **/
  test("returns 8 when passed divide and [16,2]", () => {
    const res = calculate("divide", [16, 2]);
    expect(res).toEqual(8);
  });
  test("returns 2.5 when passed divide and [20,2,4]", () => {
    const res = calculate("divide", [20, 2]);
    expect(res).toEqual(10);
  });
  test("returns 25 when passed divide and [20,2,2]", () => {
    const res = calculate("divide", [1000, 3, 2, 2, 3]);
    expect(res).toEqual(27.777777777777775);
  });
});

describe("Convert array to numbers and strings", () => {
  const input = "add/2/2/subtract/2/add/2/sub/2".split("/");
  test('returns array separated into chunks eg. [["add",50,10], ["subtract", 4]]', () => {
    const res = [
      ["add", 2, 2],
      ["subtract", 2],
      ["add", 2],
      ["sub", 2],
    ];
    const output = convert_to_operation(input);
    expect(output).toStrictEqual(res);
  });
});
