import Head from "next/head"
import fs from 'fs'
import matter from 'gray-matter'
import Link from "next/link"


export const getStaticProps = () => {

	// posts内のファイルをすべて取得
	const files = fs.readdirSync('posts')
	console.log('files:', files)

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
    };
	})

	return {
		props: {
			posts,
		},
	}
}


export default function Home({ posts }: any) {

	console.log(posts);

	return (
		<main className="mx-auto w-full lg:width-lg px-4 lg:px-0">

			<Head>
				<title>Hello Next</title>
			</Head>

			<h1 className="text-2xl">Top</h1>

			{posts.map((post: any) => (

        <div key={post.slug}>

          <Link href={`/posts/${post.slug}`}>{post.frontMatter.title}</Link>
        </div>
      ))}
		</main>
	)
}
