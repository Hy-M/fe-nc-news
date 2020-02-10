const {
    expect
} = require('chai');
const {
    formatDates
} = require('../src/utils/utils');

describe('formatDates()', () => {
    const articles = [{
        article_id: 33,
        author: "weegembump",
        body: "'SEAFOOD fraud",
        comment_count: "8",
        created_at: "2018-05-30T15:59:13.341Z",
        title: "Seafood",
        topic: "cooking",
        votes: 1
    }, {
        article_id: 33,
        author: "weegembump",
        body: "SEAFOOD without fraud",
        comment_count: "8",
        created_at: "2018-05-18T15:59:13.341Z",
        title: "Seafood",
        topic: "cooking",
        votes: 1
    }]
    it('returns an array when passed an array of articles', () => {
        expect(formatDates(articles)).to.be.an('array');
    });
    it('returns an array with a different reference to the passed in array', () => {
        expect(formatDates(articles)).to.not.equal(articles);
    });
    it('the objects in the array have a different reference to the objects in the passed in array', () => {
        expect(formatDates(articles)[0]).to.not.equal(articles[0]);
    });
    it('the passed in date is formatted', () => {
        let originalDate = articles[0].created_at;        
        expect(formatDates(articles)[0].created_at).to.not.equal(originalDate);
    });
})