import Layout from "@/components/Layout"
import Tweet from "@/entities/Tweet"
import TweetService from "@/utilities/TweetService"
import { BsPersonCircle } from "react-icons/bs"
import { AiOutlinePlus, AiOutlineReload } from "react-icons/ai"
import { useEffect, useState } from "react"
import AddTweetModal from "@/components/AddTweetModal"
import { db } from "@/utilities/firebase"
import { query, collection, orderBy, limit, onSnapshot } from "firebase/firestore"

export async function getServerSideProps() {

	const tweets = await TweetService.readTweets()

	return {
		props: {
			tweets,
		},
	};
}


interface Props {
	tweets: Tweet[],
}

function Tweets(props: Props) {

	const [isOpenModal, setIsOpenModal] = useState(false)

	const [tweets, setTweets] = useState(props.tweets)

	async function listen() {

		// 読み取りクエリを作成
		const q = query(collection(db, "tweets"), orderBy("createdAt", "desc"), limit(100))

		// リアルタイムリスナーを設定
		onSnapshot(q, async (querySnapshot) => {

			if (querySnapshot.metadata.hasPendingWrites) return

			// Tweetの配列を作成
			let tweets: Tweet[] = []
			querySnapshot.forEach((doc) => {

				// ドキュメントの各フィールドの値を取り出す
				const id: string = doc.id ?? ""
				const displayName: string = doc.data().displayName ?? ""
				const text: string = doc.data().text ?? ""
				const createdAt: Date = doc.data({ serverTimestamps: "estimate" }).createdAt.toDate() ?? new Date()

				// 値を使ってTweetオブジェクトを作成
				const tweet: Tweet = {
					id: id,
					displayName: displayName,
					text: text,
					createdAt: createdAt.toString()
				}

				// 配列に追加
				tweets.push(tweet)
			})

			// Stateを更新
			setTweets(tweets)

		}, (error) => {

			// エラーならログ出力 & State更新
			console.log(`Tweets reading failed. ${error}`)
		})
	}

	useEffect(() => {
		listen()
	}, [])

	return (

		<Layout title="Tweets">

			<div className="flex justify-between items-center">

				<h1 className="text-2xl font-bold">Tweets</h1>

				<div className="flex gap-8">

					<button onClick={() => setIsOpenModal(true)} className="flex items-center gap-2 hover:opacity-60 transition">

						<AiOutlinePlus className="text-xl" />
						<span>New Tweet</span>
					</button>
				</div>
			</div>

			<section>
				{tweets.length === 0 &&
					<p className="mt-4">There are no tweets.</p>
				}

				{tweets.length !== 0 &&
					<div className="mt-4 flex flex-col gap-4">
						{tweets.map((tweet) => (

							<div key={tweet.id} className="p-4 flex gap-4 bg-gray-100">

								<BsPersonCircle className="text-4xl text-gray-500" />

								<div className="space-y-1">

									<div className="space-x-2">
										<span className="font-bold">{tweet.displayName}</span>
										<span className="text-gray-500">{tweet.createdAt.toString()}</span>
									</div>

									<p>{tweet.text}</p>
								</div>
							</div>
						))}
					</div>
				}
			</section>

			{isOpenModal &&
				<AddTweetModal setIsOpenModal={setIsOpenModal} />
			}
		</Layout>
	)
}

export default Tweets