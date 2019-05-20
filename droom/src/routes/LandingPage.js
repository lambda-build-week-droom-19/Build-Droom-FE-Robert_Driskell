import React, { Component } from 'react';
import Button from '../views/Button';

export default class LandingPage extends Component {
    render() {
        return (
            <>
                <div className="landing">
                    <div className="logo">
                        <img src='../assets/logo.svg' alt='logo'/>
                        <h1>Droom.</h1>
                    </div>
                    <div className="text">
                        <h2>A quick and simple path to your <strong>dream</strong> job.</h2>
                    </div>
                    <Button />
                    <Button />
                </div>
            </>
        )
    }
}
