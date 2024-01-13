import { Router } from 'express';
import {
	register,
	login,
	emailConfirmation,
} from './../../controllers/auth.js';

const authRouter = Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.post('/email-confirmation/:token', emailConfirmation);

export default authRouter;
