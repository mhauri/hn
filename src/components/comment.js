import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import { useState } from "react";

const borderColors = [""]

export default function Comment({ data }) {
  const content = { __html: data.content }
  const indentStyle = `comment-indent-${data.level}`
  const shouldCollapseInitially = (data && data.level > 3) && (data.comments && data.comments.length > 0)

  const [isCollapsed, setCollapsed] = useState(shouldCollapseInitially);

  const onToggleCollasped = e => {
    e.preventDefault()

    const selection = window.getSelection();
    if (selection.type === "Range") return;

    if (data.comments && data.comments.length > 0)
      setCollapsed(!isCollapsed);
  }

  return (
    <div className="group">
      <div
        className="relative hover:bg-yellow-100 dark:hover:bg-gray-700 hover:bg-opacity-80 px-5 pl-3 -ml-3 -mr-3 py-2 -my-2 overflow-ellipsis"
        onClick={onToggleCollasped}>
        {isCollapsed &&
        <div className="absolute right-0 mr-3 sm:mt-1 px-1 text-xs font-me text-black bg-yellow-500 rounded-sm cursor-default">
          +{data.comments.length}
        </div>}
        <div className="text-sm font-normal text-gray-400 mb-1">
          <span>by {data.user}</span>
          <span className="text-gray-700"> • </span>
          <span>
            {formatDistanceToNowStrict(fromUnixTime(data.time), {
              addSuffix: true,
            })}
          </span>
        </div>
        <div className="prose dark:text-gray-300 overflow-ellipsis		" dangerouslySetInnerHTML={content} />
      </div>
      <div className={`my-4 border-l-2 ${indentStyle}`} hidden={isCollapsed}>
        <div className="ml-3 sm:ml-5 dark:text-gray-300">

          {data.comments.map(comment => <Comment key={comment.id} data={comment} />)}
        </div>
      </div>
    </div>
  )
}