import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { loginSchema, registerSchema } from '../schemas/auth.schemas.js';
import { authController } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  validate({ body: registerSchema }),
  authController.register,
);

authRouter.post(
  '/login',
  validate({ body: loginSchema }),
  authController.login,
);

authRouter.get('/me', authenticate, authController.getMe);
