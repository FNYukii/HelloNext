import Todo from "@/entities/Todo";
import AuthService from "@/utilities/AuthService";
import TodoService from "@/utilities/TodoService";
import { useState, useEffect } from "react";

function TodosSection() {

	const [todos, setTodos] = useState<Todo[] | null>(null)
	const [isLoaded, setIsLoades] = useState(false)

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

			<div className="flex justify-between">
				<h1 className="text-2xl font-bold">Todos</h1>
				<button onClick={() => AuthService.signOut()} className="font-bold">Sign out</button>
			</div>


			<div>
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
			</div>
		</div>
	)
}

export default TodosSection