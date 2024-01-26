/* eslint-disable no-undef */
import dotenv from 'dotenv';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envEnvironment = '.env.test';
const envPath = path.resolve(__dirname, `../../${envEnvironment}`);

export default dotenv.config({
	path: envPath,
});
