import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import {
  createExpenseSchema,
  updateExpenseSchema,
} from '../schemas/expense.schema.js';
import { intIdSchema, queryStringSchema } from '../schemas/common.schema.js';
import { expenseController } from '../controllers/expense.controller.js';

export const expenseRouter = Router();

expenseRouter.use(authenticate);

expenseRouter.get(
  '/',
  validate({ query: queryStringSchema }),
  expenseController.getAll,
);

expenseRouter.post(
  '/',
  validate({ body: createExpenseSchema }),
  expenseController.create,
);

expenseRouter.get(
  '/:expenseId',
  validate({ Params: intIdSchema }),
  expenseController.getOnt,
);

expenseRouter.patch(
  '/:expenseId',
  validate({ body: updateExpenseSchema, Params: intIdSchema }),
  expenseController.update,
);

expenseRouter.delete(
  '/:expenseId',
  validate({ Params: intIdSchema }),
  expenseController.remove,
);
