import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ReactGA from 'react-ga';

const TRACKING_ID = 'UA-234560740-2'
ReactGA.initialize(TRACKING_ID);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
