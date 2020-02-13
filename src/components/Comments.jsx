import React, { Component } from 'react';
import * as api from '../utils/api';
import * as utils from '../utils/utils';
import Loader from './Loader';
import CommentCard from './CommentCard';

class Comments extends Component {
    state = {
        comments: [],
        commentCount: 0,
        isLoading: true,
        commentInput: '',
        postHasBeenClicked: false,
        deleteHasBeenClicked: false
    }

    getAllComments = () => {
        api.fetchAllComments(this.props.article_id)
        .then(({ comments }) => {
            let formattedArticles = utils.formatDates(comments);
            let commentCount = formattedArticles.length;
            this.setState({ comments: formattedArticles, isLoading: false, commentCount, deleteHasBeenClicked: false });
        })
    }

    handleCommentChange = (changeEvent) => {
        let commentInput = changeEvent.target.value;
        this.setState({ commentInput });
    }

    handleCommentSubmit = (submitEvent) => {
        submitEvent.preventDefault();
        this.setState({ postHasBeenClicked: true }, () => {
            this.addComment();
        })
    }

    removeComment = (comment_id) => {
        api.deleteComment(comment_id)
        .then(() => {
            this.getAllComments()
        })
    }

    handleDeleteClick = (comment_id) => {
        this.setState({ deleteHasBeenClicked: true }, () => {
            this.removeComment(comment_id)
        })
    }

    addComment = () => {
        let commentObj = {
            username: this.props.user,
            body: this.state.commentInput
        };
        api.postComment(this.props.article_id, commentObj)
        .then(({ comment }) => {
            let formattedComment = utils.formatDates([comment]);
            this.setState((currentState) => {
                return {comments: [ formattedComment[0], ...currentState.comments], commentInput: '', postHasBeenClicked: false}
            })
        })
    }

    componentDidMount() {
        this.getAllComments();
    }

    render() {
        const { comments, isLoading, commentCount, postHasBeenClicked, deleteHasBeenClicked} = this.state;
        if (isLoading) {
            return <Loader />
        } else {
            return (
                <section className="commentsList">
                    <p className="commentsList--title">Comments: {commentCount}</p>
                    <form className="commentsList--postComment" onSubmit={this.handleCommentSubmit}>
                        <label>
                            <p className='commentsList--comment-title'>{this.props.user} said:</p>
                            <input className="commentsList--comment-input" type='text' placeholder='Type your comment here' required onChange={this.handleCommentChange} value={this.state.commentInput} />
                        </label>
                        {postHasBeenClicked ? <button className="commentsList--comment-submitBtn">Posting...</button> : <button className="commentsList--comment-submitBtn">Post</button>}
                    </form>
                    {comments.map((comment) => {
                        return (
                            <div className="commentsList--comment" key={comment.comment_id}>
                            <CommentCard comment={comment} user={this.props.user} deleteHasBeenClicked={deleteHasBeenClicked} handleDeleteClick={((clickEvent)=>{ this.handleDeleteClick(comment.comment_id)})}/>
                            </div>
                        )
                    })}
                </section>
            );
        }
    }
}

export default Comments;