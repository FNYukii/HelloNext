import Layout from "@/components/Layout"
import Todo from "@/entities/Todo";
import TodoService from "@/utilities/TodoService";
import { useState, useEffect } from "react";

function Todos() {

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

		<Layout title="Todos">

			<h1 className="text-2xl font-bold">Todos</h1>

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

							<div key={todo.id} className="p-4 bg-gray-100">
								<p>{todo.text}</p>
							</div>
						))}
					</div>
				}
			</div>
		</Layout>
	)
}

export default Todos