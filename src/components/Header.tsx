import Link from "next/link"
import { useRouter } from 'next/router'
import { AiFillGithub } from "react-icons/ai"

function Header() {

	const router = useRouter()

	return (

		<header className="pb-4">

			<div className="mx-auto w-full lg:width-lg px-4 lg:px-0 py-4 flex justify-between">

				<Link href="/" className="text-4xl">Hello Next</Link>

				<div className="flex items-center gap-4">

					<Link href="/" className={router.pathname === "/" ? "" : "text-gray-500 hover:text-black"}>Top</Link>
					<Link href="/posts" className={router.pathname === "/posts" ? "" : "text-gray-500 hover:text-black"}>Posts</Link>
					<Link href="/tweets" className={router.pathname === "/tweets" ? "" : "text-gray-500 hover:text-black"}>Tweets</Link>
					<Link href="/todos" className={router.pathname === "/todos" ? "" : "text-gray-500 hover:text-black"}>Todos</Link>

					<a href="https://github.com/Yu357/HelloNext" target="blank" className="text-gray-500 hover:text-black">
						<AiFillGithub className="text-2xl"/>
					</a>
				</div>
			</div>
		</header>
	)
}

export default Header