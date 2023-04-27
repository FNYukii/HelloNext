import Head from "next/head"

function NotFound() {
	
	return (
		<>

			<Head>
				<title>Page Not Found - Hello Next</title>
			</Head>

			<main className="mx-auto w-full lg:width-lg px-4 lg:px-0">
				
				<h1 className="text-2xl font-bold">Page Not Found</h1>

				<div className="mt-4">

					<p>Lorem ipsum dolor sit amet consectetur.</p>
				</div>
			</main>
		</>
	)
}

export default NotFound