import {NextSeo} from "next-seo"
import Head from "next/head"

export const SEO = ({title, description}) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: "https://hn.hauri.dev",
          title: title,
          description: description,
          // images: [
          //   {
          //     url: "/hn.png"
          //   }
          // ]
        }}
        twitter={{
          handle: "@mhauri",
          cardType: "summary_large_image"
        }}
      />
      <Head>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="robots" content="noindex"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000"/>
        <meta name="msapplication-TileColor" content="#000000"/>
        <meta name="theme-color" content="#ffffff"/>
      </Head>
    </>
  )
}