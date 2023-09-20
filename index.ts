/**
 * Consume two or more values and an operator and output the result
 * Example: /add/1/4 -> 5
 * @param op - The operation to be performed.
 * @param n - Array of numbers on which the operation will be performed.
 * @returns Result of the operation.
 **/

// base case is idx <= array.length
//
export function add(n: number[], prev: number = 0, idx: number = 0): number {
  if (idx >= n.length) return prev;
  if (prev === 0) {
    prev = n[idx];
  } else {
    prev += n[idx];
  }
  return add(n, prev, idx + 1);
}

// export function add(n: number[], prev: number): number {
//   let val = prev;
//   for (let i = 0, l = n.length; i < l; i++) {
//     val += n[i];
//   }
//   return val;
// }

export function subtract(n: number[], prev: number): number {
  let val;
  let idx;
  if (prev) {
    idx = 0;
    val = prev;
  } else {
    idx = 1;
    val = n[0];
  }
  for (idx; idx < n.length; idx++) {
    val -= n[idx];
  }
  return val;
}

export function divide(n: number[], prev: number = 0, idx: number = 0): number {
  if (idx >= n.length) return prev;
  if (prev === 0) {
    prev = n[idx];
  } else {
    prev = prev / n[idx];
  }
  return divide(n, prev, idx + 1);
}

// export function multiply(n: number[], prev: number): number {
//   let val;
//   let idx;
//   if (prev) {
//     idx = 0;
//     val = prev;
//   } else {
//     idx = 1;
//     val = n[0];
//   }
//   for (idx; idx < n.length; idx++) {
//     val *= n[idx];
//   }
//   return val;
// }

export function multiply(n: number[], prev: number): number {
  let val;
  let idx;
  if (prev) {
    idx = 0;
    val = prev;
  } else {
    idx = 1;
    val = n[0];
  }
  for (idx; idx < n.length; idx++) {
    val *= n[idx];
  }
  return val;
}

export function calculate(op: string, n: number[], prev: number = 0) {
  switch (op) {
    case "add":
      return add(n, prev);
    case "subtract":
      return subtract(n, prev);
    case "divide":
      return divide(n, prev);
    case "multiply":
      return multiply(n, prev);
    default:
      return prev;
  }
}

export function calculate_main(array: StrNumAr): number {
  let prev = 0;
  array.forEach((ar) => {
    const [op, ...values] = ar;
    prev = calculate(op, values, prev);
  });
  return prev;
}

/**
 * Array[String | Number] -> Array[String | Number]
 * consume array and output array of operations and values in nested array
 **/

type StrNumAr = (string | number)[][];

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

import express, { Request } from "express";

const app = express();

const PORT = Number(Bun.env.PORT) || 8080;
const HOST = Bun.env.HOST || "localhost";

type Req = Request<{ operator: string; "0": string }, {}, {}>;

app.get("/calculate/*", (req: Req, res, next) => {
  try {
    const values = req.params[0].split("/");
    const values_and_operations = convert_to_operation(values);
    const result = calculate_main(values_and_operations);
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
