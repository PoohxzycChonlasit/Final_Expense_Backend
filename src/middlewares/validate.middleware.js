import z from "zod";
import { createError } from "../utils/create-error.js";

export const validate = (schema) => (req, res, next) => {
  if (schema.body) {
    const result = schema.body.safeParse(req.body);

    if (!result.success) {
      createError(
        400,
        "Provided request body is invalid",
        z.flattenError(result.error),
      );
    }
    req.body = result.data;
  }

  if (schema.params) {
    const result = schema.params.safeParse(req.params);
    if (!result.success) {
      createError(
        400,
        "Invalid request path parameters",
        z.flattenError(result.error),
      );
    }
    req.params = result.data;
  }

  if (schema.query) {
    const result = schema.query.safeParse(req.query);
    if (!result.success) {
      createError(
        400,
        "Invalid request query parameters",
        z.flattenError(result.error),
      );
    }
    req.validatedQuery = result.data;
  }
  next();
};
