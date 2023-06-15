import Layout from "@/components/Layout"
import Link from "next/link"
import { MdChecklist, MdOutlineArticle } from "react-icons/md"

export default function Home() {

	return (

		<Layout>

			<h1 className="text-2xl font-bold">Top</h1>

			<div className="mt-4 grid grid-cols-2 gap-4">

				<Link href="/posts" className="hover:bg-gray-100 transition">

					<div className="border p-4">

						<MdOutlineArticle className="text-gray-500 text-4xl" />

						<span className="mt-2 block text-2xl">Posts</span>
						<p className="mt-2 text-gray-500">公開された記事をSSGで表示します。<br/>ビルド時にサーバー側でMarkdownからWebページを生成し、リクエストのたびにクライアントへ返しています。</p>
					</div>
				</Link>

				<Link href="/tweets" className="hover:bg-gray-100 transition">

					<div className="border p-4">

						<MdChecklist className="text-gray-500 text-4xl" />

						<span className="mt-2 block text-2xl">Tweets</span>
						<p className="mt-2 text-gray-500">公開されたつぶやきをSSRとFirebase Admin SDKで表示します。<br/>リクエスト時にCloud Firestoreのデータを読み取ってWebページを生成し、クライアントに返しています。</p>
					</div>
				</Link>

				<Link href="/todos" className="hover:bg-gray-100 transition">

					<div className="border p-4">

						<MdChecklist className="text-gray-500 text-4xl" />

						<span className="mt-2 block text-2xl">Todos</span>
						<p className="mt-2 text-gray-500">非公開のTodoをSSGとFirebase SDKで表示します。<br/>ビルド時に生成したWebページをリクエストのたびにクライアントに返し、クライアント上でデータを読み書きします。</p>
					</div>
				</Link>
			</div>
		</Layout>
	)
}
