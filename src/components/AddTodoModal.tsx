import { Dispatch, SetStateAction, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import DynamicTextarea from "./DynamicTextarea";
import TodoService from "@/utilities/TodoService";

interface Props {
	setIsShowModal: Dispatch<SetStateAction<boolean>>
}

function AddTodoModal(props: Props) {

	const [text, setText] = useState("")

	const insert = async () => {

		const todoId = await TodoService.createTodo(text)

		if (todoId === null) {
			return
		}

		props.setIsShowModal(false)
	};

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

					<DynamicTextarea value={text} setValue={setText} placeholder="やること" className="mt-4 w-full py-2 bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none focus:border-blue-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />

					<div className="mt-4 mb-8 flex justify-end">

						<button onClick={insert} className="py-2 px-4 bg-black text-white hover:opacity-60 transition">追加</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddTodoModal;