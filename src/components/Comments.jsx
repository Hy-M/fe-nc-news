import React, { Component } from 'react';
import * as api from '../utils/api';
import * as utils from '../utils/utils';
import Loader from './Loader';

class Comments extends Component {
    state = {
        comments: [],
        isLoading: true
    }

    componentDidMount() {
        this.getAllComments();
    }
    
    getAllComments = () => {
        api.fetchAllComments(this.props.article_id)
        .then(({ comments }) => {
            let formattedArticles = utils.formatDates(comments);
            this.setState({ comments: formattedArticles, isLoading: false }, () => console.log(this.state.comments)
            );
        })
    }

    render() {
        const { comments, isLoading } = this.state;
        if (isLoading) {
            return <Loader />
        } else {
            return (
                <section className="commentsList">
                    <p className="commentsList--header">Comments:</p>
                    {comments.map((comment) => {
                        return (
                            <div className="commentsList--comment" key={comment.comment_id}>
                            <p className="commentsList--info">{comment.author} said on {comment.created_at}:</p>
                            <p className="commentsList--body">{comment.body}</p>
                            </div>
                        )
                    })}
                </section>
            );
        }
    }
}

export default Comments;