const notifier = require('node-notifier');

const SendToastNotif = (Message) => {
	notifier.notify({
		title: 'Jessica',
		icon: './Icons/JessicaIcon.png',
		appID: 'Jessica',
		message: Message,
	});
};

module.exports = { SendToastNotif };
