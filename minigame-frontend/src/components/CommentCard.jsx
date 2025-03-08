import PropTypes from "prop-types";
import { ThumbsDownIcon } from "../assets/ThumbsDown";
import { ThumbsUpIcon } from "../assets/ThumbsUp";
// import {TrashIcon} from "../assets/Trash";
import "./css/CommentCard.css";

const CommentCard = ({ username, comment, likeCount, dislikeCount, lastEditDate, }) => {
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
					<button className="interaction-button">
						<ThumbsUpIcon className="icon" />
						<span>{likeCount}</span>
					</button>
					<button className="interaction-button">
						<ThumbsDownIcon className="icon" />
						<span>{dislikeCount}</span>
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
