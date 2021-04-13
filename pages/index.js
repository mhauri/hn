import {SEO} from "../src/components/seo";
import {getPosts} from "../src/service/hn";
import Posts from "../src/components/posts";
import Footer from "../src/components/footer"

export default function Home({data}) {
  return (
    <div className="min-h-screen py-10 dark:bg-gray-900 px-5">
      <SEO title={"Hacker News"} description="My personal Hacker News reader"/>
      <Posts data={data}/>
      <Footer/>
    </div>
  )
}

export async function getStaticProps(context) {
  const posts = await getPosts();
  const data = posts.filter(Boolean)

  // See: https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
}
