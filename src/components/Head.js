import Head from "next/head";

function IndexPage() {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="Secure Bookmarker" />
        <meta name="og:title" property="og:title" content="StartPIM" />
        <meta name="og:site_name" content="StartPIM" />
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
        <title>StartPIM - Secure Bookmarker</title>
      </Head>
    </div>
  );
}

export default IndexPage;
