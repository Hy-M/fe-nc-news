const axios = require('axios');

exports.fetchAllTopics = () => {
    return axios
    .get('https://nc-news-hym.herokuapp.com/api/topics')
    .then(({ data }) => {
        return data;
    })
}

exports.fetchArticles = (topic) => {
    return axios
    .get('https://nc-news-hym.herokuapp.com/api/articles', { params: { topic }})
    .then(({ data }) => {
        return data;
    })
}