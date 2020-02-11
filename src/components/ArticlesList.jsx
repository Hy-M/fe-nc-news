import React, { Component } from 'react';
import * as api from '../utils/api';
import * as utils from '../utils/utils';
import Loader from './Loader';
import { Link } from '@reach/router';

class ArticlesList extends Component {
    state = {
        articles: [],
        isLoading: true,
        sort_by: ''
    }

    getArticles = (sort_by) => {
        api.fetchArticles(this.props.topic, sort_by)
        .then(({ articles }) => {
            let formattedArticles = utils.formatDates(articles);
            this.setState({ articles: formattedArticles, isLoading: false });
        })
    }

    handleOptionChange = (changeEvent) => {
        let selectedValue = changeEvent.target.value;
        this.getArticles(selectedValue);
    }

    componentDidMount() {
        this.getArticles(null);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topic !== this.props.topic) {
            this.getArticles(null)
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
                <p className='articlesList--article-info'>Sort articles by: </p>
                <select className='articlesList--sortBy' name="sortBy" id="sortBy" onChange={this.handleOptionChange}>
                    <option value="created_at">Most recent</option>
                    <option value="comment_count">Most comments</option>
                    <option value="votes">Most votes</option>
                </select>
                {articles.map((article) => {
                    return (
                        <article className="articlesList--article" key={article.article_id}>
                        <Link to={`/articles/${article.article_id}`}><p className="articlesList--article-title">{article.title}</p></Link>
                        <p className="articlesList--article-info">Written by: {article.author}</p>
                        <p className="articlesList--article-info">On: {article.created_at}</p>
                        <p className="articlesList--article-info">Topic: {article.topic}</p>
                        <p className="articlesList--article-info">Votes: {article.votes}</p>
                        <p className="articlesList--article-info">Comments: {article.comment_count}</p>
                        </article>
                    )
                })}
            </main>
        );
       }
    }
}

export default ArticlesList;