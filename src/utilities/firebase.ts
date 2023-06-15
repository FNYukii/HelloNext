import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

// .envファイルに書いてある環境変数を元に、Firebaseプロジェクトの構成情報をまとめる
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
}

// 構成情報を元に、Firebaseを初期化
const app = initializeApp(firebaseConfig)


// キャッシュ読み取りを有効にした上で、Cloud Firestoreサービスへの参照を取得
// const db = initializeFirestore(app, {
// 	localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
// })

const db = getFirestore(app)

// データベースへの参照をエクスポート
export { db }