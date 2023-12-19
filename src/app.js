import express from 'express';
import authRouter from './routes/User/auth.js';
import router from './routes/User/index.js';
import { middleware } from './middlelware/index.js';
import { handleError } from './statusCodes/error.js';
import '../config/index.js';

const app = express();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

// Settings
app.set('port', PORT);
app.set('json spaces', 2);

app.use(express.json());

app.use(authRouter);
app.use(middleware);
app.use(router);

app.use(handleError);

export default app;
