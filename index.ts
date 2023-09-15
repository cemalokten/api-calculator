/**
 * Consume two or more values and an operator and output the result
 * Example: /add/1/4 -> 5
 * @param op - The operation to be performed.
 * @param n - Array of numbers on which the operation will be performed.
 * @returns Result of the operation.
 **/

export function add(n: number[]): number | undefined {
  let val = 0;
  for (let i = 0, l = n.length; i < l; i++) {
    val += n[i];
  }
  return val;
}

export function subtract(n: number[]): number {
  let val = n[0];
  for (let i = 1, l = n.length; i < l; i++) {
    val -= n[i];
  }
  return val;
}

export function divide(n: number[], idx: number = 0, res: number = 0): number {
  if (idx === n.length - 1) return res;
  if (res === 0) {
    res = n[idx] / n[idx + 1];
  } else {
    res = res / n[idx];
  }
  return divide(n, idx + 1, res);
}

export function calculate(op: string, n: number[]): number | undefined {
  switch (op) {
    case "add":
      return add(n);
    case "subtract":
      return subtract(n);
    case "divide":
      return divide(n);
  }
}

import express, { Request } from "express";

const app = express();

const PORT = Number(Bun.env.PORT) || 8080;
const HOST = Bun.env.HOST || "localhost";

type Req = Request<{ operator: string; "0": string }, {}, {}>;

app.get("/calculate/:operator/*", (req: Req, res, next) => {
  try {
    const operator = req.params.operator;
    const values = req.params[0];
    const array_of_values = values.split("/").map(Number);
    /** TODO: Add arbitrary number of operators **/
    const result = calculate(operator, array_of_values);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/**
TODO: Add error handler
 * const errorHandler = (error, req, res, next) => {};
 *
 * app.use(errorHandler);
 **/

app.listen(PORT, HOST, () => {
  console.log(`Listening on ${HOST}${PORT}`);
});
