import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html style={{ scrollBehavior: 'smooth', scrollMargin: '-30px' }}>
        <Head>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <body style={{ scrollBehavior: 'smooth' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
