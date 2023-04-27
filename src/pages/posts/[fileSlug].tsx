import Head from "next/head"

function PostPage() {
	return (
		<>

			<Head>
				<title>Hello Next</title>
			</Head>

			<main className="mx-auto w-full lg:width-lg px-4 lg:px-0">

				<h1 className="text-2xl">Post</h1>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum reprehenderit voluptate culpa accusamus tenetur consectetur vitae ut saepe, nobis officiis modi deserunt similique sequi totam sit excepturi, omnis nostrum maiores?</p>
			</main>
		</>
	)
}

export default PostPage