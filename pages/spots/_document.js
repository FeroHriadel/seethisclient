import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  //got rid of the standard getInitialProps here => we don't want to render everything serverside
  render() {
    return (
      <Html lang='en'>
        <Head>
            <meta charSet='UTF-8' />
            {/* you can also include e.g.: <link /> here*/}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
