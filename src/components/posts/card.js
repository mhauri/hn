import Link from "next/link";
import {formatDistanceToNowStrict, fromUnixTime} from "date-fns";

export default function PostCard({data}) {
  if (!data) return <></>;

  return (
    <div className="mb-6">
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline text-xl font-semibold leading-3 hover:text-black dark:hover:text-gray-50"
      >
        {data.title}
      </a>
      {data.meta &&
        <span>{data.meta.description}</span>
      }

      <div className="text-sm font-normal text-gray-600 dark:text-gray-400 py-1">
        <span>{data.points} points</span>
        <span className="text-gray-700"> • </span>
        <span>
          <Link href={`/${data.id}`} className="border-b border-dashed border-gray-400 hover:text-black dark:hover:text-white focus:text-black dark:focus:text-white">
              {data.comments_count} comment{data.comments_count != 1 && "s"}
          </Link>
        </span>
        <span className="text-gray-700"> • </span>
        {/* <span>by {data.user}</span> */}
        <span>
          {formatDistanceToNowStrict(fromUnixTime(data.time), {
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
    </div>
  );
}