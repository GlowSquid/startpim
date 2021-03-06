// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, { Head, Main, NextScript } from "next/document";

// import { GA_TRACKING_ID } from "../lib/gtag";

export default class extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `
            }}
          /> */}
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Lato:400,600,700"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=PT+Sans|Open+Sans&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
