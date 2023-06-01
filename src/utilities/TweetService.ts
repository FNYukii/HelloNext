import Tweet from '../entities/Tweet'
import { adminDb } from "./firebaseAdmin"
import { db } from "./firebase"
import { addDoc, collection, deleteDoc, doc, endAt, getDocFromCache, getDocFromServer, getDocs, getDocsFromCache, getDocsFromServer, limit, orderBy, query, QueryDocumentSnapshot, serverTimestamp, startAt, where } from "firebase/firestore"
import { strict } from 'assert';

export class TweetService {

	static async readTweets(): Promise<Tweet[]> {

		const tweets: Tweet[] = [];

		const ref = await adminDb.collection('tweets').get();

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

	static async createTweet(displayName: string, text: string): Promise<string | null> {

		// displayNameのチェック
		if (displayName.length === 0 || displayName.length > 30) {
			return null
		}

		// textのチェック
		if (text.length === 0 || text.length > 100) {
			return null
		}

		try {

			const ref = await addDoc(collection(db, "tweets"), {

				createdAt: serverTimestamp(),
				displayName: displayName,
				text: text
			})

			return ref.id

		} catch (error) {

			console.log(`Failed to tweet creation. ${error}`)
			return null
		}
	}
}