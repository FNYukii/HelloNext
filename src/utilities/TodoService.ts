import Todo from '@/entities/Todo'
import { db } from "./firebase"
import { query, collection, orderBy, limit, getDocs } from 'firebase/firestore'

export default class TodoService {

	static async readTodos(): Promise<Todo[]> {

		// Firestoreへの読み取りクエリを用意しておく
		const q = query(
			collection(db, "todos"),
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
}