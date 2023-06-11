const { SendToastNotif } = require('./ToastNotifs');
const Mailjet = require('node-mailjet');
require('dotenv').config();

const SendEmailNotif = async (Message, Title) => {
	const mailjet = Mailjet.apiConnect(
		process.env.API_KEY,
		process.env.API_KEY_SECRET
	);

	try {
		mailjet.post('send', { version: 'v3.1' }).request({
			Messages: [
				{
					From: {
						Email: 'scyde1@hotmail.com',
						Name: 'Jessica Cyde',
					},
					To: [
						{
							Email: 'sebcyde@hotmail.com',
							Name: 'Sebastian',
						},
					],
					Subject: Title,
					TextPart: Message,
					HTMLPart: `Hey Seb,<br><br>${Message}<br><br>J.`,
				},
			],
		});
	} catch (error) {
		console.log('Error:', error);
		SendToastNotif('There was a bug sending the email notification.');
	}
};

module.exports = { SendEmailNotif };
