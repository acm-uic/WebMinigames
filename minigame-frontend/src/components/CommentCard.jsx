import { ThumbsDownIcon } from "../assets/ThumbsDown";
import { ThumbsUpIcon } from "../assets/ThumbsUp";
import { TrashIcon } from "../assets/Trash";

const CommentCard = ({ username, comment, likeCount, dislikeCount }) => {
  return (
    <div className="w-full max-w-xl space-y-2 p-2 bg-zinc-100">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center text-xl font-semibold">
          <div className="rounded-full min-w-8 h-8 bg-zinc-700"></div>
          <span>{username}</span>
        </div>
        <div className="flex gap-2">
          <button className="p-1 rounded-lg hover:bg-zinc-200 flex items-center gap-1">
            <ThumbsUpIcon className="w-5 h-5" />
            <span className="text-sm font-medium">{likeCount}</span>
          </button>
          <button className="p-1 rounded-lg hover:bg-zinc-200 flex items-center gap-1">
            <ThumbsDownIcon className="w-5 h-5" />{" "}
            <span className="text-sm font-medium">{dislikeCount}</span>
          </button>
          <button className="p-1 rounded-lg hover:bg-zinc-200">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="break-words">{comment}</div>
    </div>
  );
};

export default CommentCard;
