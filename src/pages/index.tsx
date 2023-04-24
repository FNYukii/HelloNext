import Head from "next/head"
import fs from 'fs'


export const getStaticProps = () => {

  const posts = fs.readdirSync('posts')
  console.log('files:', posts)
	
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
