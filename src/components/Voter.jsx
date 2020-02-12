import React, { Component } from 'react';
import * as api from '../utils/api';

class Voter extends Component {
    state = {
        optimisticVote: this.props.votes,
        userVote: '',
        btnHasBeenClicked: false,
    }

    handleVoteClick = (clickEvent) => {
        clickEvent.preventDefault();
        let userVote = clickEvent.target.parentElement.id;
        this.setState({ userVote, btnHasBeenClicked: true}, () => {
            this.updateVotes()
        })
    }

    updateVotes = () => {
        let inc_votes = {
            inc_votes: 0
        }

        if (this.state.userVote === "upvote") {
            inc_votes.inc_votes = 1;
        } else {
            inc_votes.inc_votes = -1;
        }

        if (this.props.article_id) {
            api.patchVotes('articles', this.props.article_id, inc_votes);
        } else {
            api.patchVotes('comments', this.props.comment_id, inc_votes);
        }
        
        this.setState((currentState) => {
            return { optimisticVote: currentState.optimisticVote + inc_votes.inc_votes}
        })
    }

    render() {
        const { optimisticVote, btnHasBeenClicked } = this.state;
        return (
            <section className="voter">
                <p className="voter--title">Votes: {optimisticVote}</p>
                <button className={btnHasBeenClicked ? "voter--btn-inactive voter--btn" : "voter--btn"} id="upvote" onClick={this.handleVoteClick}><i className="far fa-thumbs-up"></i></button>
                <button className={btnHasBeenClicked ? "voter--btn-inactive voter--btn" : "voter--btn"} id="downvote" onClick={this.handleVoteClick}><i className="far fa-thumbs-down"></i></button>
            </section>
        );
    }
}

export default Voter;