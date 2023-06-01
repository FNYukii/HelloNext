import fs from 'fs'
import matter from 'gray-matter'
import Link from "next/link"
import Image from "next/image"
import Post from "@/entities/Post"
import Layout from "@/components/Layout"


export const getStaticProps = () => {

	// posts内のファイルをすべて取得
	const fileNames = fs.readdirSync('posts')

	// ファイルの内容を取得
	const posts = fileNames.map((fileName) => {

		// ファイル名
		const slug = fileName.replace(/\.md$/, '')

		// ファイルの内容
		const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8')

		// ファイルのFront MatterとContentを分離
		const { data, content } = matter(fileContent)

		const post: Post = {
			slug: slug,
			frontMatter: data,
			content: content
		}

		return post
	})

	return {
		props: {
			posts,
		},
	}
}


interface Props {
	posts: Post[],
}

export default function Posts(props: Props) {

	return (
		
		<Layout title="Posts">

			<h1 className="text-2xl font-bold">Posts</h1>

			<div className="mt-4 grid grid-cols-2 sm:grid-cols-3 justify-around gap-y-12 gap-x-4 lg:gap-x-8">

				{props.posts.map((post: Post) => (

					<div key={post.slug}>

						<Link href={`/posts/${post.slug}`} className="transition hover:brightness-90">

							<Image
								src={post.frontMatter.thumbnail}
								width={1200}
								height={500}
								alt={`${post.frontMatter.title}の風景`}
							/>
						</Link>

						<div className="mt-2">

							<Link href={`/posts/${post.slug}`} className="hover:underline">{post.frontMatter.title}</Link>
						</div>
					</div>
				))}
			</div>
		</Layout>
	)
}
