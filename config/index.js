/* eslint-disable no-undef */
import dotenv from 'dotenv';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envEnvironment = process.env.ENVIRONMENT
	? `../.env${process.env.ENVIRONMENT}`
	: '.env';
const envPath = path.resolve(__dirname, `../${envEnvironment}`);

console.log(envPath);
export default dotenv.config({
	path: envPath,
});
