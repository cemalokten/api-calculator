import express, { Request } from "express";
import { convert_to_operation, calculate_main, error_handler } from "./helpers";

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

app.use(error_handler);

app.listen(PORT, HOST, () => {
  console.log(`Listening on ${HOST}:${PORT}`);
});
