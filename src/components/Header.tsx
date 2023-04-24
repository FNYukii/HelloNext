import Link from "next/link";

function Header() {

	return (

		<header>

			<div>

				<Link href="/" className="font-bold text-2xl">Hello Next</Link>

				<div>

					<Link href="/about">About</Link>
					<Link href="/contact">Contact</Link>
				</div>
			</div>
		</header>
	);
}

export default Header;