import Head from "next/head";

function IndexPage() {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="Secure Bookmarker" />
        <meta name="og:title" property="og:title" content="StartPIM" />
        <meta property="og:description" content="Secure Bookmarker" />
        <meta property="og:url" content="https://startpim.com/" />
        <meta property="og:type" content="Service" />
        <meta property="og:image" content="ogp.png" />
        <meta property="og:image:alt" content="Site Logo" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700"
          rel="stylesheet"
        />
        {/* <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/regular.css"
          integrity="sha384-FKw7x8fCxuvzBwOJmhTJJsKzBl8dnN9e2R4+pXRfYoHivikuHkzWyhKWDSMcGNK8"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/fontawesome.css"
          integrity="sha384-vd1e11sR28tEK9YANUtpIOdjGW14pS87bUBuOIoBILVWLFnS+MCX9T6MMf0VdPGq"
          crossOrigin="anonymous"
        /> */}
        <title>StartPIM - Secure Bookmarker</title>
      </Head>
    </div>
  );
}

export default IndexPage;
