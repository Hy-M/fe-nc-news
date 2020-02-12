import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../utils/api';
import Loader from './Loader';

class Nav extends Component {
    state = {
        topics: [],
        isLoading: true
    };

    componentDidMount() {
        this.getAllTopics();
    }
    
    getAllTopics() {
        api.fetchAllTopics()
        .then(({ topics }) => {
            this.setState({ topics, isLoading: false });
        });
    }

    render() {
        const { topics, isLoading } = this.state;
        if (isLoading) {
            return <Loader />
        } else {
            return (
                <nav className="nav">
                    <Link to="/" className="nav--link link">Home</Link>
                    {topics.map((topic) => {
                        return <Link to={`/${topic.slug}`} className="nav--link link" key={topic.slug}>{topic.slug}</Link>
                    })}
                </nav>
            ); 
        }
    }
}

export default Nav;