import Layout from "@/components/Layout"
import AuthService from "@/utilities/AuthService"
import { auth } from "../utilities/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import TodosSection from "@/components/TodosSection"

function Todos() {

	// ログイン状態
	const [isSignedIn, setIsSignedIn] = useState(false)

	// ログイン状態を監視
	useEffect(() => {

		// Auth初期化前はAuthStateを取得できないので、それまではLocalStorageに保存しておいたUIDを確認
		const uid = AuthService.uidFromLocalStorage()
		if (uid) {
			setIsSignedIn(true)
		}

		onAuthStateChanged(auth, (user) => {
			if (user) {

				// ログイン済み
				setIsSignedIn(true)

			} else {

				// 未ログイン
				setIsSignedIn(false)
			}
		})
	}, [])

	return (

		<Layout title="Todos">

			{!isSignedIn &&
				<div>

					<h1 className="text-2xl font-bold">Todos</h1>

					<p>You are not signed in. Please sign in to use Todo List.</p>
					<button onClick={() => AuthService.signInWithGoogle()} className="font-bold">Sign in with Google</button>
				</div>
			}

			{isSignedIn &&
				<TodosSection />
			}
		</Layout>
	)
}

export default Todos