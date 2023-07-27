const { GetAnimeFavourites } = require('./GetAnimeFavourites');
const moment = require('moment-timezone');
const axios = require('axios');
const { SendToastNotif } = require('../../ToastNotifs');
const { SendEmailNotif } = require('../../EmailNotifs');

const TimeConverter = (BroadcastObject) => {
	const { day, time, timezone } = BroadcastObject;
	const format = 'dddd HH:mm';
	const dateTimeString = `${day} ${time}`;

	// Convert to the timezone and parse as a Date object
	const date = moment.tz(dateTimeString, format, timezone).toDate();
	return date;
};

const formatDifference = (diff) => {
	const minutes = Math.floor(diff / (1000 * 60)); // Convert milliseconds to minutes
	const hours = Math.floor(minutes / 60); // Calculate the number of hours
	const remainingMinutes = minutes % 60; // Calculate the remaining minutes

	let formattedTime = 'in ';

	if (hours > 0) {
		formattedTime += `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
		if (remainingMinutes > 0) {
			formattedTime += ` and ${remainingMinutes} ${
				remainingMinutes === 1 ? 'minute' : 'minutes'
			}`;
		}
	} else if (hours > 0 && remainingMinutes > 0) {
		formattedTime += `${remainingMinutes} ${
			remainingMinutes === 1 ? 'minute' : 'minutes'
		}`;
	} else {
		formattedTime = 'now';
	}

	return formattedTime;
};

const isWithinOneHour = (Favourite) => {
	const threshold = 60 * 60 * 1000; // 1 hour in milliseconds
	const currentTime = Date.now();

	const date = new Date(Favourite.Schedule);
	const diff = Math.abs(date - currentTime);

	if (diff <= threshold) {
		return { Soon: true, Time: formatDifference(diff) };
	}

	return { Soon: false, Time: formatDifference(diff) };
};

const TimeCheck = (FavouritesSchedule) => {
	const DroppingSoon = [];

	FavouritesSchedule.forEach((Fave) => {
		const Dropping = isWithinOneHour(Fave);
		if (Dropping.Soon) {
			DroppingSoon.push(Fave);
			SendToastNotif(`${Fave.Title_Eng} is releasing ${Dropping.Time}.`);
			SendEmailNotif(
				`${Fave.Title_Eng} is releasing ${Dropping.Time}.`,
				'Jessica'
			);
		}
	});

	console.log('Dropping Soon:', DroppingSoon);
};

const AnimeUpdates = async () => {
	const FavouritesList = GetAnimeFavourites();
	const now = new Date();

	const res = await axios.get('https://api.jikan.moe/v4/seasons/now');

	const UploadSchedule = res.data.data.map((Anime) => {
		const BC = Anime.broadcast;

		return {
			Title: Anime.title,
			Title_Eng: Anime.title_english,
			Schedule: TimeConverter(BC),
		};
	});

	const FavouritesSchedule = UploadSchedule.filter((Anime) => {
		let EnglishTitle = Anime.Title_Eng?.toLowerCase();
		let JapTitle = Anime.Title?.toLowerCase();
		let FilterPass = false;

		FavouritesList.forEach((Favourite) => {
			const Fave = Favourite.toLowerCase();
			if (EnglishTitle && EnglishTitle.includes(Fave)) FilterPass = true;
			if (JapTitle && JapTitle.includes(Fave)) FilterPass = true;
		});

		return FilterPass;
	});

	// Testing
	// FavouritesSchedule.push({
	// 	Title: 'Kimetsu no Yaiba: Katanakaji no Sato-hen',
	// 	Title_Eng: 'Kimetsu no Yaiba',
	// 	Schedule: now.toISOString(),
	// });

	// console.log('Upload Schedule:', UploadSchedule);
	// console.log('Favourites List:', FavouritesList);
	// console.log('Favourites Schedule:', FavouritesSchedule);

	TimeCheck(FavouritesSchedule);
};

module.exports = { AnimeUpdates };

// BUGS IN THE EMAIL SENDING
