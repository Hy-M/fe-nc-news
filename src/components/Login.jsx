import React, { Component } from 'react';
import * as api from '../utils/api';

class Login extends Component {
    state = {
        user: '',
        token: ''
    }
    //create the token by post request w username
    //send token in every request to back-end on authorization header

    handleLoginChange = (changeEvent) => {
        let userInput = changeEvent.target.value;
        this.setState({ user: userInput }, () => {
            console.log(this.state);
        })
    }

    handleLoginSubmit = (submitEvent) => {
        submitEvent.preventDefault();
        let userObj = {
            username: this.state.user
        };
        console.log(userObj, "userobj");
        
        api.postUserForToken(userObj)
        .then((res) => {
            console.log(res, "resposne");
            
        })
        .catch((err) => {
            console.dir(err);
            
        })
    }

    render() {
        return (
            <main>
                <h3>Sign in to your account</h3>
                <form onSubmit={this.handleLoginSubmit}>
                    <label>
                        Username: <input onChange={this.handleLoginChange} type="text" placeholder="jessjelly" />
                    </label>
                    <button>Sign in</button>
                </form>
            </main>
        );
    }
}

export default Login;