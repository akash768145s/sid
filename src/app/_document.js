import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Meta tag for viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add any other head tags or links here */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
