import React from 'react';
import Voter from './Voter';

const CommentCard = ({ comment, user, handleDeleteClick, deleteHasBeenClicked }) => {
    return (
        <>
            <p className="commentsList--comment-title">{comment.author} said on {comment.created_at}:</p>
            <p className="commentsList--comment-body">{comment.body}</p>
            <Voter comment_id={comment.comment_id} votes={comment.votes}/>
            {comment.author === user && !deleteHasBeenClicked && <button id={comment.comment_id}className="commentsList--comment-trashBtn" onClick={handleDeleteClick}><i className="fas fa-trash"></i></button>}
            {comment.author === user && deleteHasBeenClicked && <button id={comment.comment_id}className="commentsList--comment-trashBtn" onClick={handleDeleteClick}>Deleting...</button>}
        </>
    )
};

export default CommentCard;