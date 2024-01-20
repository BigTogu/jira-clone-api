export class AppError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.status = statusCode < 500 ? 'error' : 'fail';

		Error.captureStackTrace(this, this.constructor);
	}
}

// eslint-disable-next-line no-unused-vars
export function handleError(err, req, res, next) {
	//Si err.status no existe, le asignamos 'fail'
	err.status = err.status || 'fail';
	err.statusCode = err.statusCode || 500;

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
}
