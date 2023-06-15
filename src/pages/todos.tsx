import Layout from "@/components/Layout"
import Todo from "@/entities/Todo";
import TodoService from "@/utilities/TodoService";
import { useState, useEffect } from "react";

function Todos() {

	const [todos, setTodos] = useState<Todo[] | null>(null)
	const [isLoaded, setIsLoades] = useState(false)

	async function read() {
		console.log("hello");

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
					<div>
						{todos.map(todo => (
							<div key={todo.id}>
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