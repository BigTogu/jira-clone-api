import express from 'express';
import authRouter from './routes/User/auth.js';
import router from './routes/User/index.js';
import { middleware } from './middlelware/index.js';
import { handleError } from './statusCodes/error.js';

const app = express();

// Settings
app.set('port', 8000);
app.set('json spaces', 2);

app.use(express.json());

app.use(authRouter);
app.use(middleware);
app.use(router);

app.use(handleError);

export default app;
