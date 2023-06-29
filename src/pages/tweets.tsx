import Layout from "@/components/Layout"
import Tweet from "@/entities/Tweet"
import TweetService from "@/utilities/TweetService"
import { BsPersonCircle } from "react-icons/bs"
import { AiOutlinePlus, AiOutlineReload } from "react-icons/ai"
import { useState } from "react"
import AddTweetModal from "@/components/AddTweetModal"

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

	return (

		<Layout title="Tweets">

			<div className="flex justify-between items-center">

				<h1 className="text-2xl font-bold">Tweets</h1>

				<div className="flex gap-8">

					<button onClick={() => location.reload()} className="flex items-center gap-2 hover:opacity-60 transition">

						<AiOutlineReload className="text-xl" />
						<span>Reload</span>
					</button>

					<button onClick={() => setIsOpenModal(true)} className="flex items-center gap-2 hover:opacity-60 transition">

						<AiOutlinePlus className="text-xl" />
						<span>New Tweet</span>
					</button>
				</div>
			</div>

			<section>
				{props.tweets.length === 0 &&
					<p className="mt-4">There are no tweets.</p>
				}

				{props.tweets.length !== 0 &&
					<div className="mt-4 flex flex-col gap-4">
						{props.tweets.map((tweet) => (

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