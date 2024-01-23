import express from 'express';
import authRouter from './routes/User/auth.js';
import router from './routes/User/index.js';
import routerBoard from './routes/Board/index.js';
import { middleware } from './middlelware/index.js';
import { handleError } from './statusCodes/error.js';
import cors from 'cors';

const app = express();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

// Settings
app.set('port', PORT);
app.set('json spaces', 2);

app.use(express.json());

app.use(
	cors({
		origin: 'http://localhost:3000',
	}),
);
app.use(authRouter);
app.use(middleware);
app.use(router);
app.use(routerBoard);

app.use(handleError);

export default app;
