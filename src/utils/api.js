const axios = require('axios');

exports.fetchAllTopics = () => {
    return axios
    .get('https://nc-news-hym.herokuapp.com/api/topics')
    .then(({ data }) => {
        return data;
    })
}

exports.fetchArticles = (topic_slug) => {
    return axios
    .get('https://nc-news-hym.herokuapp.com/api/articles', { params: { topic_slug }})
    .then(({ data }) => {
        return data;
    })
}