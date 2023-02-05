import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta
          name='description'
          content='Read about death of influences, politicians, rappers and other public figures. Career, net worth and death'
        />
        <Script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4007300633906997'
          crossOrigin='anonymous'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script src='../path/to/flowbite/dist/flowbite.min.js' />
        <Script src='../path/to/flowbite/dist/datepicker.js' />
        <Script src='https://unpkg.com/flowbite@1.6.0/dist/datepicker.js' />
      </body>
    </Html>
  )
}
