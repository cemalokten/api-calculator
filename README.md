# API Calculator

This is a simple Express API that provides calculate endpoints for basic math operations.

![API-Calculator](./public/api-calc.svg)

## What?

A calculator that consumes url params and returns results server side, for whatever reason...

Adds, subtracts, divides and multiplies

Accepts arbitrary lengths of operations and numbers, for example:

```bash
/calculate/add/10/15/subtract/5/divide/2 -> 10
```

## Endpoints

### `GET /calculate/:operator/:values`

Performs a calculation based on the provided operator and values.

- `:operator` - The arithmetic operator to use. Can be `add`, `subtract`, `multiply`, or `divide`.
- `:values` - The numeric values to calculate, separated by `/`.

#### Example Request(s)

```bash
GET /calculate/add/1/2/3 -> 6
```

```bash
GET /calculate/subtract/10/5 -> 5
```

```bash
GET /calculate/divide/50/5 -> 10
```

```bash
GET /calculate/add/20/30/subtract/20/add/10/divide/2/multiply/2 -> 40
```

## Code Overview

#### `index.js`

The main Express app file. 

- Sets up the Express app and its middleware.
- Defines the `/calculate` route and handler.
- Calls helper functions to parse the request and perform the calculation.
- Handles errors with a custom error handler middleware.

#### `helpers/index.js` 

Contains helper functions used by `index.js`.

- `convert_to_operation` - Parses the request params into an array of operation/values arrays.
- `calculate_main` - Performs the calculations by iterating through the operations. 
- `error_handler` - Custom error handler middleware.

Contains the recursive arithmetic functions, used recursion to practice using recursion, to practice using recursion... 

- `add()`
- `subtract()`
- `multiply()`
- `divide()`

## Usage

### BUN

```bash
bun install
bun run dev
```

### NPM

```bash
npm install
npm run dev
```

The server will start on port 8080. 

To calculate `2 + 3 - 5`, make a request:

```
GET /calculate/add/2/3/subtract/5
```

The result will be returned in the JSON response.
