import React, { Component } from 'react';
import * as api from '../utils/api';
import * as utils from '../utils/utils';

class ArticlesList extends Component {
    state = {
        articles: []
    }

    componentDidMount() {
        this.getArticles();
    }

    getArticles = () => {
        api.fetchArticles()
        .then(({ articles }) => {
            this.setState({ articles }, () => {
                console.log(articles);
            });
        })
    }
    
    render() {
        const { articles } = this.state;
        return (
            <main className='articlesList'>
                {articles.map((article) => {
                    return (
                        <article>
                        <h4>{article.title}</h4>
                        <p>Topic: {article.topic}</p>
                        <p>By: {article.author}</p>
                        <p>On: {article.created_at}</p>
                        </article>
                    )
                })}
            </main>
        );
    }
}

export default ArticlesList;