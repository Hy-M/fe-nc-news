exports.formatDates = (articles) => {
    return articles.map((article) => {
        let articleCopy = { ...article };
        let date = new Date(articleCopy.created_at);
        let formattedDate = date.toDateString();
        articleCopy.created_at = formattedDate;
        return articleCopy;
    });
}