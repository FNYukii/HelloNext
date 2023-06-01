import { MdClose } from "react-icons/md";

interface Props {
	setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

function AddTweetModal(props: Props) {

	return (
		<div className="z-10 fixed top-0 left-0 w-full h-full flex justify-center items-center">

			<div onClick={() => props.setIsOpenModal(false)} className="w-full h-full bg-black/40"></div>

			<div className="absolute bg-white p-8 md:width-600 w-11/12 max-height-screen-90 overflow-y-auto">

				<button onClick={() => props.setIsOpenModal(false)}>
					<MdClose className="text-gray-500 text-3xl hover:opacity-80" />
				</button>

				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil explicabo magnam soluta?</p>
			</div>
		</div>
	);
}

export default AddTweetModal;