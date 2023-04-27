import Head from "next/head"
import fs from 'fs'
import matter from 'gray-matter'
import Link from "next/link"
import Image from "next/image"


export const getStaticProps = () => {

	// posts内のファイルをすべて取得
	const files = fs.readdirSync('posts')

	// ファイルの内容を取得
	const posts = files.map((fileName) => {

		// ファイル名
		const fileSlug = fileName.replace(/\.md$/, '')

		// ファイルの内容
		const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8')

		// ファイルのFront MatterとContentを分離
		const { data, content } = matter(fileContent)

		return {
			frontMatter: data,
			fileSlug,
		}
	})

	return {
		props: {
			posts,
		},
	}
}


export default function Home({ posts }: any) {

	return (
		<>

			<Head>
				<title>Hello Next</title>
			</Head>

			<main className="mx-auto w-full lg:width-lg px-4 lg:px-0">

				<Image src={`/images/temmabashi.png`}
					alt="天満橋の風景"
					width={1200}
					height={500}
				/>

				<h1 className="text-2xl font-bold">Top</h1>

				<div className="mt-4">

					{posts.map((post: any) => (

						<div key={post.fileSlug}>

							<Link href={`/posts/${post.fileSlug}`} className="hover:underline">{post.frontMatter.title}</Link>
						</div>
					))}
				</div>
			</main>
		</>
	)
}
