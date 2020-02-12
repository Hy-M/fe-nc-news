import React, { Component } from 'react';
import * as api from '../utils/api';
import * as utils from '../utils/utils';
import Loader from './Loader';
import Voter from './Voter';

class Comments extends Component {
    state = {
        comments: [],
        commentCount: 0,
        isLoading: true,
        commentInput: '',
    }

    getAllComments = () => {
        api.fetchAllComments(this.props.article_id)
        .then(({ comments }) => {
            let formattedArticles = utils.formatDates(comments);
            let commentCount = formattedArticles.length;
            this.setState({ comments: formattedArticles, isLoading: false, commentCount });
        })
    }

    handleCommentChange = (changeEvent) => {
        let commentInput = changeEvent.target.value;
        this.setState({ commentInput });
    }

    handleCommentSubmit = (submitEvent) => {
        submitEvent.preventDefault();
        this.addComment();
    }

    removeComment = (comment_id) => {
        api.deleteComment(comment_id)
        .then(() => {
            this.getAllComments()
        })
    }

    handleDeleteClick = (clickEvent) => {
        clickEvent.preventDefault();
        let deletedCommentId = clickEvent.target.parentElement.id;
        this.removeComment(deletedCommentId)
    }

    addComment = () => {
        let commentObj = {
            username: this.props.user,
            body: this.state.commentInput
        };
        api.postComment(this.props.article_id, commentObj)
        .then(({ comment }) => {
            this.setState((currentState) => {
                return {comments: [ comment, ...currentState.comments], commentInput: ''}
            })
        })
    }

    componentDidMount() {
        this.getAllComments();
    }

    render() {
        const { comments, isLoading, commentCount } = this.state;
        if (isLoading) {
            return <Loader />
        } else {
            return (
                <section className="commentsList">
                    <p className="commentsList--title">COmments: {commentCount}</p>
                    {comments.map((comment) => {
                        return (
                            <div className="commentsList--comment" key={comment.comment_id}>
                            <p className="commentsList--comment-title">{comment.author} said on {comment.created_at}:</p>
                            <p className="commentsList--comment-body">{comment.body}</p>
                            <Voter comment_id={comment.comment_id} votes={comment.votes}/>
                            {comment.author === this.props.user && <button id={comment.comment_id}className="commentsList--comment-trashBtn" onClick={this.handleDeleteClick}><i className="fas fa-trash"></i></button>}
                            </div>
                        )
                    })}
                    <form className="commentsList--postComment" onSubmit={this.handleCommentSubmit}>
                        <label>
                            <p className='commentsList--comment-title'>{this.props.user} said:</p>
                            <input className="commentsList--comment-input" type='text' placeholder='Type your comment here' required onChange={this.handleCommentChange} value={this.state.commentInput} />
                        </label>
                        <button className="commentsList--comment-submitBtn">Post</button>
                    </form>
                </section>
            );
        }
    }
}

export default Comments;