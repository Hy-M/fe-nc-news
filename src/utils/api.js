const axios = require('axios');

exports.fetchAllTopics = () => {
    return axios
    .get('https://nc-news-hym.herokuapp.com/api/topics')
    .then(({ data }) => {
        return data;
    })
}

exports.fetchArticles = (topic, sort_by) => {
    return axios
    .get('https://nc-news-hym.herokuapp.com/api/articles', 
    { params: {
        topic,
        sort_by
    }})
    .then(({ data }) => {
        return data;
    })
}

exports.fetchSingleArticle = (article_id) => {
    return axios
    .get(`https://nc-news-hym.herokuapp.com/api/articles/${article_id}`)
    .then(({ data }) => {
        return data;
    })
}

exports.fetchAllComments = (article_id) => {
    return axios
    .get(`https://nc-news-hym.herokuapp.com/api/articles/${article_id}/comments`)
    .then(({ data }) => {
        return data;
    })
}

exports.postComment = (article_id, commentObj) => {
    return axios
    .post(`https://nc-news-hym.herokuapp.com/api/articles/${article_id}/comments`, commentObj)
    .then(({ data }) => {
        return data;
    })
}

exports.deleteComment = (comment_id) => {
    return axios
    .delete(`https://nc-news-hym.herokuapp.com/api/comments/${comment_id}`)
    .then(() => {
        console.log("deleted");
    })
}

exports.patchVotes = (article_id, inc_votes) => {
    return axios
    .patch(`https://nc-news-hym.herokuapp.com/api/articles/${article_id}`, inc_votes)
    .then(({ data }) => {
        return data;
    })
}