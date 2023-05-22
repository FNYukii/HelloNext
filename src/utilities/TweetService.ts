import Tweet from '../entities/Tweet'
import { collection, query, getDocs } from "firebase/firestore"
import { db } from "../utilities/firebase"

export class TweetService {

	static async readTweets(): Promise<Tweet[]> {

		// usersコレクション内のドキュメントを読み取り
		const q = query(collection(db, "tweets"))
		const querySnapshot = await getDocs(q)

		// 配列usersを作成
		let tweets: Tweet[] = []
		querySnapshot.forEach((doc) => {

			const id = doc.id
			const displayName = doc.data().displayName
			const text = doc.data().text
			const createdAt: Date = doc.data({ serverTimestamps: "estimate" }).createdAt.toDate() ?? new Date()

			const tweet: Tweet = { id: id, displayName: displayName, text: text, createdAt: createdAt }
			tweets.push(tweet)
		})

		return tweets
	}
}