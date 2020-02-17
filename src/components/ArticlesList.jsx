import React, { Component } from 'react';
import * as api from '../utils/api';
// import * as utils from '../utils/utils';
import Loader from './Loader';
import Err from './Err';
import ArticleCard from './ArticleCard';

class ArticlesList extends Component {
    state = {
        articles: [],
        isLoading: true,
        sort_by: '',
        err: false,
        errMsg: '',
        errStatus: 0
    }

    formatDates = (articles) => {
        return articles.map((article) => {
            let articleCopy = { ...article };
            let date = new Date(articleCopy.created_at);
            let formattedDate = date.toDateString();
            articleCopy.created_at = formattedDate;
            return articleCopy;
        });
    }

    getArticles = (sort_by) => {
        api.fetchArticles(this.props.topic, sort_by)
        .then(({ articles }) => {
            let formattedArticles = this.formatDates(articles);
            this.setState({ articles: formattedArticles, isLoading: false, err: false });
        })
        .catch(({ response }) => {
            let errStatus = response.status;
            let errMsg = response.data.msg;
            this.setState({err: true, isLoading: false, errStatus, errMsg });
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
        const { articles, isLoading, err, errMsg, errStatus} = this.state;
       if (isLoading) {
           return <Loader />
       } else if (err) {
            return <Err errMsg={errMsg} errStatus={errStatus}/>
       } else {
        return (
            <main className='articlesList'>
                <section className="articlesList--nav">
                { !this.props.topic ? <h4 className="articlesList--title">Viewing all articles</h4> : <h4 className="articlesList--title">Viewing {this.props.topic} articles</h4>  }
                <p className='articlesList--sortTitle'>Sort articles by: </p>
                <select className='articlesList--sortBy' name="sortBy" id="sortBy" onChange={this.handleOptionChange}>
                    <option value="created_at">Most recent</option>
                    <option value="comment_count">Most comments</option>
                    <option value="votes">Most votes</option>
                </select>
                </section>
                {articles.map((article) => {
                    return (
                        <article className="articlesList--article" key={article.article_id}>
                            <ArticleCard article={article} />
                        </article>
                    )
                })}
            </main>
        );
       }
    }
}

export default ArticlesList;