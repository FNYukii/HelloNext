import Link from "next/link";

function Header() {

	return (

		<header>

			<div className="mx-auto w-full lg:width-lg px-4 lg:px-0 py-4 flex justify-between">

				<Link href="/" className="text-4xl">Hello Next</Link>

				<div className="flex items-center gap-4">

					<Link href="/" className="hover:underline">Top</Link>
					<Link href="/about" className="hover:underline">About</Link>
					<Link href="/contact" className="hover:underline">Contact</Link>
				</div>
			</div>
		</header>
	);
}

export default Header;