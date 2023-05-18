import Head from "next/head"
import Link from "next/link"

export default function Home() {

	return (
		<>

			<Head>
				<title>Hello Next</title>
			</Head>

			<main className="mx-auto w-full lg:width-lg px-4 lg:px-0">

				<h1 className="text-2xl font-bold">Top</h1>

				<Link href="/posts" className="hover:underline">Posts</Link>
				<Link href="/todos" className="hover:underline">Todos</Link>
			</main>
		</>
	)
}
