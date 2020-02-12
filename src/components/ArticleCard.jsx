import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ article }) => {
    return (
       <>
       <Link className="link" to={`/articles/${article.article_id}`}><p className="articlesList--article-title">{article.title}</p></Link>
        <p className="articlesList--article-info">Written by: {article.author}</p>
        <p className="articlesList--article-info">On: {article.created_at}</p>
        <p className="articlesList--article-info">Topic: {article.topic}</p>
        <p className="articlesList--article-info">Votes: {article.votes}</p>
        <p className="articlesList--article-info">Comments: {article.comment_count}</p>
       </>
    );
};

export default ArticleCard;