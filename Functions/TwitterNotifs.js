const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.CONSUMER_SECRET;

const SendTwitterNotif = async (Message, Title) => {
	const twitterClient = new TwitterApi({
		clientId: TWITTER_CLIENT_ID,
		clientSecret: TWITTER_CLIENT_SECRET,
	});

	const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
		callbackURL,
		{
			scope: [
				'tweet.read',
				'tweet.write',
				'users.read',
				'offline.access',
				'dm.read',
				'dm.write',
				'follows.read',
				'follows.write',
				'like.read',
				'like.write',
				'users.read',
				'mute.read',
				'mute.write',
			],
		}
	);
};

module.exports = { SendTwitterNotif };
