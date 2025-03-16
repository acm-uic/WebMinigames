import PropTypes from "prop-types";
import { useState } from "react";
import { ThumbsDownIcon } from "../assets/ThumbsDown";
import { ThumbsUpIcon } from "../assets/ThumbsUp";
import { ThumbsUpFilled } from "../assets/ThumbsUpFilled";
import { ThumbsDownFilled } from "../assets/ThumbsDownFilled";
// import {TrashIcon} from "../assets/Trash";
import "./css/CommentCard.css";

const CommentCard = ({ username, comment, likeCount, dislikeCount, lastEditDate, }) => {

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likeCounter, setLikeCounter] = useState(likeCount);
  const [dislikeCounter, setDislikeCounter] = useState(dislikeCount);

  const handleLike = () => {
    // If currently disliked, remove the dislike when liking
    if (isDisliked) {
      setIsDisliked(false);
      setDislikeCounter((prevCount) => prevCount - 1);
    }

    setIsLiked(!isLiked);
    setLikeCounter((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  const handleDislike = () => {
    // If currently liked, remove the like when disliking
    if (isLiked) {
      setIsLiked(false);
      setLikeCounter((prevCount) => prevCount - 1);
    }
    
    setIsDisliked(!isDisliked);
    setDislikeCounter((prevCount) =>
      isDisliked ? prevCount - 1 : prevCount + 1
    );
  };

  return (
		<div className="comment-container">
			<div className="comment-card">
				<div className="comment-header">
					<div className="profile-picture"></div>
					<span className="username">{username}</span>
          <span className="edit-date">Last Edit Date: {lastEditDate}</span>
          <a href="#" className="report-link">Report</a>
				</div>

				<div className="comment-body">
					<p>{comment}</p>
				</div>

        <div className="interaction-buttons">
          <button className={`interaction-button ${isLiked ? 'active' : ''}`} onClick={handleLike}>
            {isLiked ? <ThumbsUpFilled className="icon" /> : <ThumbsUpIcon className="icon" />}
            <span>{likeCounter}</span>
          </button>
          <button className={`interaction-button ${isDisliked ? 'active' : ''}`} onClick={handleDislike}>
            {isDisliked ? <ThumbsDownFilled className="icon" /> : <ThumbsDownIcon className="icon" />}
            <span>{dislikeCounter}</span>
          </button>
        </div>
        
			</div>
		</div>
	);
};

CommentCard.propTypes = {
  username: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  dislikeCount: PropTypes.number.isRequired,
  lastEditDate: PropTypes.string.isRequired,
};

export default CommentCard;
