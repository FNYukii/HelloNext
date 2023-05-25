import Head from "next/head";

interface Props {
	title?: string
	children: JSX.Element | JSX.Element[]
}

function Layout(props: Props) {

	return (
		<>

			<Head>
				<title>{props.title ? `${props.title} - Hello Next` : "Hello Next"}</title>
			</Head>

			<main className="mx-auto w-full lg:width-lg px-4 lg:px-0">
				{props.children}
			</main>
		</>
	)
}

export default Layout;