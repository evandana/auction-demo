// Libraries
import React from 'react';

import { LoginActions } from '../../../actions/LoginActions'

import './_login.scss';

// Styles
// import './header.scss';
// Application Components

const Login = React.createClass({

    requestLoginGoogle() {
        LoginActions.requestLoginGoogle();
    },

    render() {
        return (
            <div className="login-page pure-form pure-form-aligned">
                <fieldset>
                    <div className="pure-controls">
                        <h1>Welcome to the Demo Auction App</h1>
                        <p>Login with a Google account to view the auctions!</p>
                        <p>This is a simplified version of the app, using light-hearted dummy data.</p>
                        <button
                            className="login-button pure-button pure-button-primary"
                            onClick={this.requestLoginGoogle}>
                            Google Login
                        </button>
                    </div>
                </fieldset>
            </div>
        )
    }
})

export default Login