import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default dotenv.config({
	// eslint-disable-next-line no-undef
	path: path.resolve(__dirname, `../.env.${process.env.ENVIRONMENT}`),
});
