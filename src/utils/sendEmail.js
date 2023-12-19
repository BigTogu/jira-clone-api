/* eslint-disable no-undef */
import nodemailer from 'nodemailer';
import '../../config/index.js';

export async function sendEmail(email, subject, text) {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});
		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: subject,
			text: text,
		});
	} catch (err) {
		console.log('Email not sent');
		console.log(err);
	}
}
