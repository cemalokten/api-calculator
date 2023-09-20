/**
 * Consume two or more values and an operator and output the result
 * Example: /add/1/4 -> 5
 * @param op - The operation to be performed.
 * @param n - Array of numbers on which the operation will be performed.
 * @returns Result of the operation.
 **/

import { NextFunction, Request, Response } from "express";

export function add(n: number[], prev: number = 0, idx: number = 0): number {
  if (idx >= n.length) return prev;
  prev === 0 ? (prev = n[idx]) : (prev += n[idx]);
  return add(n, prev, idx + 1);
}

export function subtract(
  n: number[],
  prev: number = 0,
  idx: number = 0,
): number {
  if (idx >= n.length) return prev;
  prev === 0 ? (prev = n[idx]) : (prev -= n[idx]);
  return subtract(n, prev, idx + 1);
}

export function multiply(
  n: number[],
  prev: number = 0,
  idx: number = 0,
): number {
  if (idx >= n.length) return prev;
  prev === 0 ? ((prev = n[idx]), (idx = 0)) : (prev *= n[idx]);
  return multiply(n, prev, idx + 1);
}

export function divide(n: number[], prev: number = 0, idx: number = 0): number {
  if (idx >= n.length) return prev;
  prev === 0 ? (prev = n[idx]) : (prev = prev / n[idx]);
  return divide(n, prev, idx + 1);
}

export function calculate(op: string, n: number[], prev: number = 0) {
  switch (op) {
    case "add":
      return add(n, prev);
    case "subtract":
      return subtract(n, prev);
    case "multiply":
      return multiply(n, prev);
    case "divide":
      return divide(n, prev);
    default:
      return prev;
  }
}
type StrNumAr = (string | number)[][];

export function calculate_main(array: StrNumAr): number {
  let prev = 0;
  array.forEach((ar: any[]) => {
    const [op, ...values]: any = ar;
    prev = calculate(op, values, prev);
  });
  return prev;
}

export function convert_to_operation(array: string[]): StrNumAr {
  const operations: (string | number)[] = [];
  const grouped_operations: (string | number)[][] = [];

  for (let i = 0, n = array.length; i < n; i++) {
    if (isNaN(array[i] as any)) {
      operations.push(array[i]);
    } else if (!isNaN(array[i] as any)) {
      operations.push(Number(array[i]));
    }
  }

  let idx = -1;
  for (let j = 0, nn = operations.length; j < nn; j++) {
    if (typeof operations[j] === "string") {
      idx++;
      grouped_operations.push([operations[j]]);
    } else if (typeof operations[j] === "number") {
      grouped_operations[idx].push(operations[j]);
    }
  }
  return grouped_operations;
}

export function error_handler(
  error: Error,
  _,
  response: Response,
  next: NextFunction,
) {
  if (error.name === "TypeError") {
    return response
      .status(400)
      .json({ error: "Please enter an operation and some values" });
  } else {
    return response
      .status(400)
      .json({ error: error.message, name: error.name });
  }
  next(error);
}
