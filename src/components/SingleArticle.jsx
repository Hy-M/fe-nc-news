import React, { Component } from 'react';
import * as utils from '../utils/utils';
import * as api from '../utils/api';
import Loader from './Loader';
import Comments from './Comments';
import Voter from './Voter';
import Err from './Err';

class SingleArticle extends Component {
    state = {
        article: {},
        isLoading: true,
        err: false,
        errMsg: '',
        errStatus: 0
    }

    componentDidMount() {
        this.getSingleArticle();
    }

    getSingleArticle = () => {
        api.fetchSingleArticle(this.props.article_id) 
        .then(({ article }) => {
            let formattedArticles = utils.formatDates([article]);
            this.setState({ article: formattedArticles[0], isLoading: false, err: false })
        })
        .catch(({ response }) => {
            let errStatus = response.status;
            let errMsg = response.data.msg;
            this.setState({err: true, isLoading: false, errStatus, errMsg });
        })
    }
    
    render() {
        const { article, isLoading, err, errMsg, errStatus } = this.state;
        if (isLoading) {
            return <Loader />
        } else if (err) {
            return <Err errMsg={errMsg} errStatus={errStatus}/>
        } else {
            return (
                <main>
                <article className="singleArticle">
                    <p className="singleArticle--title">{article.title}</p>
                    <p className="singleArticle--info">Written by: {article.author}</p>
                    <p className="singleArticle--info">On: {article.created_at}</p>
                    <p className="singleArticle--body">{article.body}</p>
                </article>
                    <Voter article_id={this.props.article_id} votes={article.votes}/>
                    <Comments article_id={this.props.article_id} user={this.props.user}/>
                </main>
            );
        }
    }
}

export default SingleArticle;