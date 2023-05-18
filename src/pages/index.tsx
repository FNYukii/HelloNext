import Head from "next/head"
import Link from "next/link"
import { MdChecklist, MdOutlineArticle } from "react-icons/md"

export default function Home() {

	return (
		<>

			<Head>
				<title>Hello Next</title>
			</Head>

			<main className="mx-auto w-full lg:width-lg px-4 lg:px-0">

				<h1 className="text-2xl font-bold">Top</h1>

				<div className="mt-4 flex flex-wrap gap-4">

					<Link href="/posts" className="hover:bg-gray-100 transition w-full sm:w-fit">

						<div className="border p-4">

							<MdOutlineArticle className="text-gray-500 text-4xl"/>

							<span className="mt-2 block text-xl">Posts</span>
							<p className="text-gray-500">Articles rendered by SSG</p>
						</div>
					</Link>

					<Link href="/todos" className="hover:bg-gray-100 transition w-full sm:w-fit">

						<div className="border p-4">

							<MdChecklist className="text-gray-500 text-4xl"/>

							<span className="mt-2 block text-xl">Todos</span>
							<p className="text-gray-500">Todo List rendered by SSR</p>
						</div>
					</Link>
				</div>

			</main>
		</>
	)
}
