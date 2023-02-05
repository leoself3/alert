import type { AppProps } from 'next/app'
import Script from 'next/script'
import { ToastContainer } from 'react-toastify'
import { config } from '@fortawesome/fontawesome-svg-core'
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-toastify/dist/ReactToastify.css'

import Layout from '../components/Layout'
import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  config.autoAddCss = false

  return (
    <>
      <Script
        strategy='afterInteractive'
        src='https://www.googletagmanager.com/gtag/js?id=G-23EFTJ53HR'
      />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Script
        async
        id='adsense-id'
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4007300633906997'
        data-ad-client='ca-pub-4007300633906997'
        crossOrigin='anonymous'
        strategy='beforeInteractive'
        onError={(e) => {
          console.error('Script failed to load', e)
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </>
  )
}

export default App
