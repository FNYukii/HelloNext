import Link from "next/link"
import { useRouter } from 'next/router'

function Header() {

	const router = useRouter()

	return (

		<header>

			<div className="mx-auto w-full lg:width-lg px-4 lg:px-0 py-4 flex justify-between">

				<Link href="/" className="text-4xl">Hello Next</Link>

				<div className="flex items-center gap-4">

					<Link href="/" className={router.pathname == "/" ? "" : "text-gray-500 hover:text-black"}>Top</Link>
					<Link href="/about" className={router.pathname == "/about" ? "" : "text-gray-500 hover:text-black"}>About</Link>
					<Link href="/contact" className={router.pathname == "/contact" ? "" : "text-gray-500 hover:text-black"}>Contact</Link>
				</div>
			</div>
		</header>
	)
}

export default Header