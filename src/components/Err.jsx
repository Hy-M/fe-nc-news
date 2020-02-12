import React, { Component } from 'react';
import * as api from '../utils/api';
import { render } from '@testing-library/react';

class Err extends Component {
    state = {
        catURL: ''
    }

    componentDidMount() {
        this.getHTTPCat();
    }

    getHTTPCat = () => {
        let errStatus = this.props.errStatus;
        if (errStatus) {
            api.fetchHTTPCat(errStatus)
            .then((headers) => {
                let catURL = headers['x-final-url'];
                this.setState({ catURL }, () => {
                    console.log(this.state)
                })
            })
        }
    }

    render() {
        const { catURL } = this.state;
        const { errMsg } = this.props;
        return (
            <main className="error">
                <p className="error--msg">{errMsg || "Sorry, something went wrong..."}</p>
                {catURL && <img src={catURL} alt="cat" className="error--img"></img>}
            </main>
        )   
    }
}

export default Err;