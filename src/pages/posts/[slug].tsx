import Head from "next/head"
import fs from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'
import Image from "next/image"

export async function getStaticPaths() {

	// mdファイル一覧を取得
	const fileNames = fs.readdirSync('posts')

	// 記事ページのpath情報を作成
	const paths = fileNames.map((fileName) => ({

		params: {
			slug: fileName.replace(/\.md$/, ''),
		},
	}))

	// getStaticPropsに渡す
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }: any) {

	// 表示する記事のmdファイルを取得
	const slug = params.slug
	const file = fs.readFileSync(`posts/${slug}.md`, 'utf-8')

	// ファイルの内容をfrontMatter部分とcontent部分に分ける
	const { data, content } = matter(file);

	// PostPageに渡す
	return {
		props: {
			frontMatter: data,
			content
		}
	}
}

function PostPage({ frontMatter, content }: any) {
	return (
		<>

			<Head>
				<title>Hello Next</title>
			</Head>

			<main className="mx-auto w-full lg:width-lg px-4 lg:px-0">

				<Image src={frontMatter.thumbnail}
					alt={`${frontMatter.title}の風景`}
					width={1200}
					height={500}
					className="bg-gray-200"
				/>

				<h1 className="text-2xl font-bold mt-6">{frontMatter.title}</h1>

				<div dangerouslySetInnerHTML={{ __html: marked(content) }} className="markdown"></div>
			</main>
		</>
	)
}

export default PostPage