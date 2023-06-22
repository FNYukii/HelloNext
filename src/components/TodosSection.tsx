import Todo from "@/entities/Todo";
import AuthService from "@/utilities/AuthService";
import TodoService from "@/utilities/TodoService";
import { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

function TodosSection() {

	const [todos, setTodos] = useState<Todo[] | null>(null)
	const [isLoaded, setIsLoades] = useState(false)

	const [isShowModal, setIsShowModal] = useState(false)

	async function read() {

		// record一覧を読み取り
		const todos: Todo[] | null = await TodoService.readTodos()
		setTodos(todos)
		setIsLoades(true)
	}

	useEffect(() => {

		read()
	}, []);

	return (

		<div>

			<section className="flex justify-between items-center">

				<h1 className="text-2xl font-bold">Todos</h1>

				<div className="flex gap-4">

					<button onClick={() => setIsShowModal(true)} className="font-bold hover:opacity-60 transition">New Todo</button>
					<button onClick={() => AuthService.signOut()} className="font-bold text-red-500 hover:opacity-60 transition">Sign out</button>
				</div>
			</section>

			<section>

				{isShowModal &&

					<div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center dark:text-white">

						<div onClick={() => setIsShowModal(false)} className="w-full h-full bg-black/30 dark:bg-white/20"></div>

						<div className="absolute bg-white rounded-xl md:width-600 w-11/12 max-height-screen-90 overflow-y-auto dark:bg-black">

							<div className="pt-4 pl-4">

								<button onClick={() => setIsShowModal(false)} className="p-4 transition rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
									<MdOutlineClose className="text-2xl text-zinc-500" />
								</button>
							</div>

							<div className="px-8">

								<h1 className="mt-4 text-2xl font-bold">新規Todo</h1>
							</div>
						</div>
					</div>
				}
			</section>

			<section>
				{!isLoaded &&
					<p>Loading ...</p>
				}

				{isLoaded && todos === null &&
					<p>Todo reading failed</p>
				}


				{isLoaded && todos !== null && todos.length !== 0 &&

					<div className="mt-4 flex flex-col gap-4">

						{todos.map(todo => (

							<div key={todo.id} className="p-4 bg-gray-100 space-y-2">
								<p>{todo.text}</p>
								<p className="text-gray-500">{todo.createdAt.toString()}</p>
							</div>
						))}
					</div>
				}
			</section>
		</div>
	)
}

export default TodosSection