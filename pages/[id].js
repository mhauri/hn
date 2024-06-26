import Link from "next/link";
import {useRouter} from 'next/router'
import {formatDistanceToNowStrict, fromUnixTime} from "date-fns";
import {getPostIds, getPostWithComments} from "../src/service/hn";
import Comment from '../src/components/comment'
import {SEO} from "../src/components/seo";

export default function Item({data}) {
  const {isFallback} = useRouter();
  const content = {__html: data ? data.content : ""};

  if (isFallback) {
    return <div className="min-h-screen py-5 dark:bg-gray-900 px-5">
      <SEO title={"Hacker News"} description="My personal Hacker News reader"/>
      <div className="min-h-screen flex items-center bg-gray-50 dark:bg-black">
        <svg className="w-6 h-6 m-auto animate-spin" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"
             viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5"/>
        </svg>
      </div>
    </div>
  }

  return (
    <div className="min-h-screen py-5 dark:bg-gray-900 px-5">
      <SEO title={data.title} description={data.content ? data.content : data.title}/>
      <div className="min-h-screen flex flex-col mx-auto max-w-3xl px-4 md:px-0 overflow-x-hidden overflow-ellipsis	">
        <header className="pt-10 mt-10 text-center">
          <Link href="/" className="flex flex-row items-center text-accent hover:text-black dark:hover:text-gray-50 rounded-sm py-1 pr-2 text-xs sm:text-sm">
              <svg className="w-6 h-6"  width={'12px'} fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back
          </Link>
          <h1
            className="mt-4 pb-4 font-semibold text-2xl sm:text-4xl text-center sm:text-left text-transparent text-black dark:text-gray-300">
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.title}
            </a>
          </h1>
          {data.content && <div className="prose mb-6" dangerouslySetInnerHTML={content}/>}
          <div className="text-center sm:text-left text-sm font-normal text-gray-400">
            <span>{data.points} points</span>
            <span className="text-gray-700"> • </span>
            <span>
              <Link href={`/${data.id}`} className="border-b border-dashed border-gray-400 hover:text-black dark:hover:text-white focus:text-black dark:focus:text-white">
                  {data.comments_count} comment{data.comments_count !== 1 && "s"}
              </Link>
            </span>
            <span className="text-gray-700"> • </span>
            <span>
              {formatDistanceToNowStrict(fromUnixTime(data.time ?? null), {
                addSuffix: true,
              })}
            </span>
            {data.url && (
              <>
                <span className="text-gray-700"> • </span>
                <span>
                  {data.url.match(
                    /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}(?!w{1,}\.)[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/
                  )}
                </span>
              </>
            )}
          </div>
        </header>
        <div className="mt-6 mb-6">
          <div className="border-t border-dashed border-gray-400"/>
        </div>
        <main className="flex-1 space-y-6">
          {/* Comments */}
          {data.comments.map(comment => <Comment key={comment.id} data={comment}/>)}
        </main>
      </div>
    </div>
  );
}

// Must provide paths because this dynamic route is generated at build time
// getStaticProps will then use the id in the params object
// See: https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export async function getStaticPaths() {
  const ids = await getPostIds();
  const paths = ids.map((id) => ({
    params: {id: id.toString()}, // Id should be a string
  }));

  return {paths, fallback: true};
}

export async function getStaticProps({params}) {
  const data = await getPostWithComments(params.id);

  if (!data) {
    console.warn(`Can't find post data with id=${params.id}`)
    return {
      notFound: true
    }
  }

  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
}