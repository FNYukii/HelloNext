import Tweet from "@/entities/Tweet"
import { TweetService } from "@/utilities/TweetService"
import Head from "next/head"
import { BsPersonCircle } from "react-icons/bs"

export async function getStaticProps() {

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

function tweets(props: Props) {

	return (
		<>

			<Head>
				<title>Tweets - Hello Next</title>
			</Head>

			<main className="mx-auto w-full lg:width-lg px-4 lg:px-0">

				<h1 className="text-2xl font-bold">Tweets</h1>

				<div className="mt-4">

					<div className="flex flex-col gap-4">
						{props.tweets.map((tweet) => (

							<div key={tweet.id} className="p-2 border flex gap-4">

								<BsPersonCircle className="text-4xl text-gray-500" />

								<div>

									<div className="flex gap-2">
										<span className="font-bold">{tweet.displayName}</span>
										<span className="text-gray-500">{tweet.createdAt.toString()}</span>
									</div>
									<p>{tweet.text}</p>
								</div>
							</div>

						))}
					</div>
				</div>
			</main>
		</>
	)
}

export default tweets