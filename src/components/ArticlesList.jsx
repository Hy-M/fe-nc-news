import React, { Component } from 'react';
import * as api from '../utils/api';
import * as utils from '../utils/utils';
import Loader from './Loader';

class ArticlesList extends Component {
    state = {
        articles: [],
        isLoading: true
    }

    getArticles = () => {
        api.fetchArticles(this.props.topic)
        .then(({ articles }) => {
            let formattedArticles = utils.formatDates(articles);
            this.setState({ articles: formattedArticles, isLoading: false });
        })
    }

    componentDidMount() {
        this.getArticles();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topic !== this.props.topic) {
            this.getArticles()
        }
    }
    
    render() {
        const { articles, isLoading } = this.state;
       if (isLoading) {
           return <Loader />
       } else {
        return (
            <main className='articlesList'>
                { !this.props.topic ? <h4>Viewing all articles</h4> : <h4>Viewing {this.props.topic} articles</h4>  }
                {articles.map((article) => {
                    return (
                        <article className="articlesList--article" key={article.article_id}>
                        <p className="articlesList--article-title">{article.title}</p>
                        <p className="articlesList--article-info">Written by: {article.author}</p>
                        <p className="articlesList--article-info">On: {article.created_at}</p>
                        <p className="articlesList--article-info">Topic: {article.topic}</p>
                        </article>
                    )
                })}
            </main>
        );
       }
    }
}

export default ArticlesList;