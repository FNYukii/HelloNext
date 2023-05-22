import Tweet from "@/entities/Tweet"
import { TweetService } from "@/utilities/TweetService"
import Head from "next/head"
import { useEffect, useState } from "react"

function tweets() {

	const [tweets, setTweets] = useState<Tweet[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	async function readTweets() {

		const tweets = await TweetService.readTweets()
		setTweets(tweets)
		setIsLoaded(true)
	}

	useEffect(() => {

		readTweets()
	}, [])

	return (
		<>

			<Head>
				<title>Tweets - Hello Next</title>
			</Head>

			<main className="mx-auto w-full lg:width-lg px-4 lg:px-0">

				<h1 className="text-2xl font-bold">Tweets</h1>

				<p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing.</p>

				{!isLoaded &&

					<div>
						<p>ロード中...</p>
					</div>
				}

				{isLoaded && tweets === null &&
					<div>
						<p>ロード失敗!</p>
					</div>
				}

				{isLoaded && tweets !== null && tweets.length === 0 &&
					<div>
						<p>ツイート0件!</p>
					</div>
				}

				{isLoaded && tweets !== null &&
					<div>
						<p>ツイートを{tweets.length}件ロードしました</p>
					</div>
				}
			</main>
		</>
	)
}

export default tweets