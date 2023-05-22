import Head from "next/head"

function tweets() {
	
	return (
		<>

			<Head>
				<title>Tweets - Hello Next</title>
			</Head>

			<main className="mx-auto w-full lg:width-lg px-4 lg:px-0">

				<h1 className="text-2xl font-bold">Tweets</h1>

				<p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
			</main>
		</>
	)
}

export default tweets