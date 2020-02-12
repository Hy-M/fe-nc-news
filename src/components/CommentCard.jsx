import React from 'react';
import Voter from './Voter';

const CommentCard = ({ comment, user, handleDeleteClick }) => {
    return (
        <>
            <p className="commentsList--comment-title">{comment.author} said on {comment.created_at}:</p>
            <p className="commentsList--comment-body">{comment.body}</p>
            <Voter comment_id={comment.comment_id} votes={comment.votes}/>
            {comment.author === user && <button id={comment.comment_id}className="commentsList--comment-trashBtn" onClick={handleDeleteClick}><i className="fas fa-trash"></i></button>}
        </>
    )
};

export default CommentCard;