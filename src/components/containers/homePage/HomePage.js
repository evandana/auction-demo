// REACT/REDUX
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { getImageForEnv } from '../../../images/index'

import './_homePage.scss'

class HomePage extends Component {


    constructor(props) {
        super(props)
    }

    render () {

        return (
            <div className="home-page">
                <h3>Thank you for joining the Auction!</h3>
                <img src={getImageForEnv('he-lockup.png')} />
                <p>Welcome, {this.props.user.name}. To keep anonymity while bidding, you will be called "{this.props.user.persona}".</p>
                <p>
                    Bidding will be live. Winners will be connected
                        with the auction-providers and instructions on how to donate.
                </p>
                <p><a href="#/auctions">View the auctions</a></p>
            </div>
        )
    }
}

export default connect(mapStateToProps)(HomePage);


function mapStateToProps (state) {
    return {
        user: state.login.user
    }
}
