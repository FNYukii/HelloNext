import Head from "next/head"

function NotFound() {
	
	return (
		<>

			<Head>
				<title>Page Not Found - Hello Next</title>
			</Head>

			<main className="mx-auto w-full lg:width-lg px-4 lg:px-0">
				
				<h1 className="text-2xl">Page Not Found</h1>
			</main>
		</>
	)
}

export default NotFound