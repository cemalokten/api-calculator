import {
  calculate,
  divide,
  convert_to_operation,
  calculate_main,
} from "../helpers";

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
  test("returns 8 when passed divide and [16,2]", () => {
    const res = divide([16, 2]);
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

  // Multipy
  test("returns 8 when passed divide and [2,4]", () => {
    const res = calculate("multiply", [2, 4]);
    expect(res).toEqual(8);
  });
});

describe("Convert array to numbers and strings", () => {
  const input =
    "add/20/2/divide/2/multiply/2/add/20/divide/2/subtract/1/add/50/suck/10/add/5".split(
      "/",
    );
  test("returns total of input", () => {
    const array = convert_to_operation(input);
    const result = calculate_main(array);
    expect(result).toEqual(75);
  });
});
