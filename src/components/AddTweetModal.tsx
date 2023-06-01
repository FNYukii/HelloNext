import { MdClose } from "react-icons/md";
import DynamicTextarea from "./DynamicTextarea";
import { useEffect, useState } from "react";
import TweetService from "@/utilities/TweetService";

interface Props {
	setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

function AddTweetModal(props: Props) {

	const [displayName, setDisplayName] = useState("")
	const [text, setText] = useState("")

	useEffect(() => {
		document.addEventListener("keydown", onKeyDown, false)
	}, [])

	const onKeyDown = (event: KeyboardEvent) => {

		if (event.key === "Escape") {
			props.setIsOpenModal(false)
		}
	}

	async function addTweet() {

		// const id = await TweetService.createTweet(displayName, text)
	}

	return (
		<div className="z-10 fixed top-0 left-0 w-full h-full flex justify-center items-center">

			<div onClick={() => props.setIsOpenModal(false)} className="w-full h-full bg-black/40"></div>

			<div className="absolute bg-white p-8 md:width-600 w-11/12 max-height-screen-90 overflow-y-auto space-y-4">

				<button onClick={() => props.setIsOpenModal(false)}>
					<MdClose className="text-gray-500 text-3xl hover:opacity-60 transition" />
				</button>

				<input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="名前" className="w-full py-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 placeholder:text-gray-400" />

				<DynamicTextarea value={text} setValue={setText} placeholder="ツイート" className="mt-3 w-full py-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 placeholder:text-gray-400" />

				<div className="flex justify-end">

					<button onClick={addTweet} className="py-2 px-4 bg-black text-white hover:opacity-60 transition">
						<span>投稿</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default AddTweetModal;