import { Dispatch, SetStateAction } from "react";
import { MdOutlineClose } from "react-icons/md";

interface Props {
	setIsShowModal: Dispatch<SetStateAction<boolean>>
}

function AddTodoModal(props: Props) {

	return (

		<div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center dark:text-white">

			<div onClick={() => props.setIsShowModal(false)} className="w-full h-full bg-black/30 dark:bg-white/20"></div>

			<div className="absolute bg-white rounded-xl md:width-600 w-11/12 max-height-screen-90 overflow-y-auto dark:bg-black">

				<div className="pt-4 pl-4">

					<button onClick={() => props.setIsShowModal(false)} className="p-4 transition rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
						<MdOutlineClose className="text-2xl text-zinc-500" />
					</button>
				</div>

				<div className="px-8">

					<h1 className="mt-4 text-2xl font-bold">新規Todo</h1>
				</div>
			</div>
		</div>
	);
}

export default AddTodoModal;