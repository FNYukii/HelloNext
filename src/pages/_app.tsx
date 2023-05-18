import { AppProps } from 'next/app'
import '../styles/index.css'
import Header from '@/components/Header'

function App({ Component, pageProps }: AppProps) {

	return (

		<div>
			<Header/>
			<Component {...pageProps} />
		</div>
	)
}

export default App