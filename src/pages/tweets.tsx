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

				<div className="mt-4">
					{!isLoaded &&

						<div>
							<p>ロード中...</p>
						</div>
					}

					{isLoaded && tweets === null &&
						<div>
							<p>ロード失敗。</p>
						</div>
					}

					{isLoaded && tweets !== null && tweets.length === 0 &&
						<div>
							<p>ツイートはありません。</p>
						</div>
					}

					{isLoaded && tweets !== null &&
						<div>
							{tweets.map((tweet) => (

								<div key={tweet.id} className="flex flex-col gap-2 p-2 border">
									
									<span className="font-bold">{tweet.displayName}</span>
									<p>{tweet.text}</p>
									<span className="text-gray-500">{tweet.createdAt.toString()}</span>
								</div>
							))}
						</div>
					}
				</div>
			</main>
		</>
	)
}

export default tweets