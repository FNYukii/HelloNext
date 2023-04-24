import Head from "next/head"
import fs from 'fs'


export const getStaticProps = () => {

	// posts内のファイルをすべて取得
	const files = fs.readdirSync('posts')
	console.log('files:', files)

	// ファイルの内容を取得
	const posts = files.map((fileName) => {

		const fileSlug = fileName.replace(/\.md$/, '')
		const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8')

		console.log(`fileSlug: ${fileSlug}, fileContent: ${fileContent}`)

		return ""
	})

	return {
		props: {
			posts: [],
		},
	}
}


export default function Home() {

	return (
		<main className="mx-auto w-full lg:width-lg px-4 lg:px-0">

			<Head>
				<title>Hello Next</title>
			</Head>

			<h1>Top</h1>
		</main>
	)
}
