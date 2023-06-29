import Todo from '@/entities/Todo'
import { db } from "./firebase"
import { query, collection, orderBy, limit, getDocs, where, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore'
import AuthService from './AuthService'

export default class TodoService {

	static async readTodos(): Promise<Todo[] | null> {

		const userId = await AuthService.uid()

		// Firestoreへの読み取りクエリを用意しておく
		const q = query(
			collection(db, "todos"),
			where("userId", "==", userId),
			orderBy("createdAt", "desc"),
			limit(100)
		)

		try {

			// Firestoreデータベース(サーバーもしくはキャッシュ)から読み取り
			const querySnapshot = await getDocs(q)

			// 成功の場合
			console.log(`SUCCESS! Read ${querySnapshot.size} todos.`)

			// todosの配列を作成
			let todos: Todo[] = []
			querySnapshot.forEach((doc) => {

				// ドキュメントの各フィールドの値を取り出す
				const id: string = doc.id ?? ""
				const createdAt: Date = doc.data({ serverTimestamps: "estimate" }).createdAt.toDate()
				const userId: string = doc.data().userId ?? ""
				const text: string = doc.data().text ?? ""

				// 値を使ってTodoオブジェクトを作成
				const todo: Todo = {
					id: id,
					text: text,
					userId: userId,
					createdAt: createdAt,
				}

				// 配列に追加していく
				todos.push(todo)
			})

			return todos

		} catch (error) {

			// 失敗の場合
			// ログ出力して、nullを返す
			console.log(`FAIL! Error reading todos. ${error}`)
			return null
		}
	}

	static async createTodo(text: string): Promise<string | null> {

		// 文字数チェック
		if (text.length === 0 || text.length > 100) {
			return
		}

		// UID取得
		const userId = await AuthService.uid()

		try {

			const ref = await addDoc(collection(db, "todos"), {
				createdAt: serverTimestamp(),
				userId: userId,
				text: text
			})

			return ref.id

		} catch (error) {

			console.log(`Failed to comment creation. ${error}`)
			return null
		}
	}
	
	static async deleteTodo(todoId: string): Promise<string | null> {

		return deleteDoc(doc(db, "todos", todoId))
			.then(() => {

				return todoId
			})
			.catch((error) => {

				console.log(`Failed to todo deletion. ${error}`)
				return null
			})
	}
}