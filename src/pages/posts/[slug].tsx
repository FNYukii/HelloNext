import Head from "next/head"
import fs from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'
import Image from "next/image"
import Post from "@/entities/Post"
import Layout from "@/components/Layout"

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

	const post: Post = {
		slug: slug,
		frontMatter: data,
		content: content
	}

	// PostPageに渡す
	return {
		props: {
			post
		}
	}
}


interface Props {
	post: Post
}

function PostPage(props: Props) {

	return (
		<Layout title={props.post.frontMatter.title}>

			<Image src={props.post.frontMatter.thumbnail}
				alt={`${props.post.frontMatter.title}の風景`}
				width={1200}
				height={500}
				className="bg-gray-200"
			/>

			<div className="w-full md:width-md mx-auto">
				<h1 className="text-2xl font-bold mt-6">{props.post.frontMatter.title}</h1>
			</div>

			<div dangerouslySetInnerHTML={{ __html: marked(props.post.content) }} className="markdown pb-16"></div>
		</Layout>
	)
}

export default PostPage