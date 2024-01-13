/* eslint-disable no-undef */
import nodemailer from 'nodemailer';
import '../../config/index.js';

export async function sendEmail(email, subject, text, verifyToken) {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		let mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject: subject,
			text: text,
			html: `Press <a href=http://localhost:3000/email-confirmation?token=${verifyToken}>here</a> to verify your email. Thanks`,
		};

		await transporter.sendMail(mailOptions);
	} catch (err) {
		console.log('Email not sent');
		console.log(err);
	}
}
