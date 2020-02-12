import React, { Component } from 'react';
import * as api from '../utils/api';

class Voter extends Component {
    state = {
        optimisticVote: this.props.votes,
        userVote: 0,
        btnHasBeenClicked: false,
        err: false
    }

    handleVoteClick = (userVote) => {             
        this.setState({ userVote, btnHasBeenClicked: true}, () => {
            this.updateVotes()
        })
    }

    updateVotes = () => {
        let inc_votes = {
            inc_votes: this.state.userVote
        }

        if (this.props.article_id) {
            api.patchVotes('articles', this.props.article_id, inc_votes).catch(() => {
                this.setState({ err: true })
            })
        } else {
            api.patchVotes('comments', this.props.comment_id, inc_votes).catch(() => {
                this.setState({ err: true })
            })
        }
        
        this.setState((currentState) => {
            return { optimisticVote: currentState.optimisticVote + inc_votes.inc_votes}
        })
    }

    render() {
        const { optimisticVote, btnHasBeenClicked, err } = this.state;
        return (
            <section className="voter">
                <p className="voter--title">Votes: {optimisticVote}</p>
                <button className={btnHasBeenClicked ? "voter--btn-inactive voter--btn" : "voter--btn"} id="upvote" onClick={((clickEvent) => {
                    clickEvent.preventDefault();
                    this.handleVoteClick(1)
                })}><i className="far fa-thumbs-up"></i></button>
                <button className={btnHasBeenClicked ? "voter--btn-inactive voter--btn" : "voter--btn"} id="downvote" onClick={((clickEvent) => {
                    clickEvent.preventDefault();
                    this.handleVoteClick(-1)
                })}><i className="far fa-thumbs-down"></i></button>
                { btnHasBeenClicked && err && <p className="voter--errorMsg">Sorry, votes cannot be added right now.</p>}    
            </section>
        );
    }
}

export default Voter;