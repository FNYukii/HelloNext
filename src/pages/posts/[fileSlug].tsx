import Head from "next/head"
import fs from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'

export async function getStaticPaths() {

	// mdファイル一覧を取得
	const files = fs.readdirSync('posts')

	// 記事ページのpath情報を作成
	const paths = files.map((fileName) => ({

		params: {
			fileSlug: fileName.replace(/\.md$/, ''),
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
	const fileSlug = params.fileSlug
	const file = fs.readFileSync(`posts/${fileSlug}.md`, 'utf-8')

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

				<h1 className="text-2xl">{frontMatter.title}</h1>
				
				<div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
			</main>
		</>
	)
}

export default PostPage