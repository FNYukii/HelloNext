import Tweet from '../entities/Tweet'
import { db } from "../utilities/admin"

export class TweetService {

	static async readTweets(): Promise<Tweet[]> {

		const tweets: Tweet[] = [];

		const ref = await db.collection('tweets').get();

		ref.docs.map((doc) => {

			const id = doc.id
			const displayName = doc.data().displayName
			const text = doc.data().text

			const createdAt: Date = doc.data().createdAt.toDate() ?? new Date()

			const tweet: Tweet = { id: id, displayName: displayName, text: text, createdAt: createdAt.toString() }
			tweets.push(tweet);
		});


		return tweets
	}
}