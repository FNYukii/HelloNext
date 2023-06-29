import Todo from "@/entities/Todo";
import AuthService from "@/utilities/AuthService";
import { useState, useEffect } from "react";
import AddTodoModal from "./AddTodoModal";
import { db } from "@/utilities/firebase";
import { query, collection, where, orderBy, limit, onSnapshot } from "firebase/firestore";

function TodosSection() {

	const [todos, setTodos] = useState<Todo[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	const [isShowModal, setIsShowModal] = useState(false)

	async function listen() {

		// UserIDを取得
		const userId = await AuthService.uidFromLocalStorage()

		// 未ログインなら、エラーとする
		if (userId === null) {

			console.log("Fail! Error to listen todos. 未ログイン状態です。")
			setIsLoaded(true)
			return
		}

		// 読み取りクエリを作成
		const q = query(collection(db, "todos"), where("userId", "==", userId), orderBy("createdAt", "desc"), limit(100))

		// リアルタイムリスナーを設定
		onSnapshot(q, async (querySnapshot) => {

			// TODO: このコードの意味を調べる
			if (querySnapshot.metadata.hasPendingWrites) return

			// Todoの配列を作成
			let todos: Todo[] = []
			querySnapshot.forEach((doc) => {

				// ドキュメントの各フィールドの値を取り出す
				const id: string = doc.id ?? ""
				const userId: string = doc.data().userId ?? ""

				const text: string = doc.data().text ?? ""

				const createdAt: Date = doc.data({ serverTimestamps: "estimate" }).createdAt.toDate() ?? new Date()

				// 値を使ってTodoオブジェクトを作成
				const todo: Todo = {
					id: id,
					userId: userId,
					text: text,
					createdAt: createdAt
				}

				// 配列に追加
				todos.push(todo)
			})

			// Stateを更新
			setTodos(todos)
			setIsLoaded(true)

		}, (error) => {

			// エラーならログ出力 & State更新
			console.log(`Comments reading failed. ${error}`)
			setIsLoaded(true)
		})
	}

	useEffect(() => {

		listen()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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

					<AddTodoModal setIsShowModal={setIsShowModal} />
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