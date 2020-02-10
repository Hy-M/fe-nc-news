import React, { Component } from 'react';
import * as utils from '../utils/utils';
import * as api from '../utils/api';
import Loader from './Loader';
import Comments from './Comments';

class SingleArticle extends Component {
    state = {
        article: {},
        isLoading: true
    }

    componentDidMount() {
        this.getSingleArticle();
    }

    getSingleArticle = () => {
        api.fetchSingleArticle(this.props.article_id) 
        .then(({ article }) => {
            let formattedArticles = utils.formatDates([article]);
            this.setState({ article: formattedArticles[0], isLoading: false })
        })
    }
    
    render() {
        const { article, isLoading } = this.state;
        if (isLoading) {
            return <Loader />
        } else {
            return (
                <main>
                <article className="singleArticle">
                    <p className="singleArticle--title">{article.title}</p>
                    <p className="singleArticle--info">Written by: {article.author}</p>
                    <p className="singleArticle--info">On: {article.created_at}</p>
                    <p className="singleArticle--body">{article.body}</p>
                </article>
                    <Comments article_id={this.props.article_id}/>
                </main>
            );
        }
    }
}

export default SingleArticle;