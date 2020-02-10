import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../utils/api';

class Nav extends Component {
    state = {
        topics: []
    };

    componentDidMount() {
        this.getAllTopics();
    }
    
    getAllTopics() {
        api.fetchAllTopics()
        .then(({ topics }) => {
            this.setState({ topics });
        });
    }

    render() {
        const { topics } = this.state;
        return (
            <nav className="nav">
                <Link to="/" className="nav--link">Home</Link>
                {topics.map((topic) => {
                    return <Link to={`/${topic.slug}`} className="nav--link" key={topic.slug}>{topic.slug}</Link>
                })}
            </nav>
        );
    }
}

export default Nav;