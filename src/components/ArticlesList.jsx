import React, { Component } from 'react';
import * as api from '../utils/api';
import * as utils from '../utils/utils';

class ArticlesList extends Component {
    state = {
        articles: []
    }

    getArticles = () => {
        api.fetchArticles(this.props.topic)
        .then(({ articles }) => {
            let formattedArticles = utils.formatDates(articles);
            this.setState({ articles: formattedArticles });
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
        const { articles } = this.state;
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

export default ArticlesList;