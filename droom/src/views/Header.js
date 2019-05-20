import React from 'react'

const Header = () => {
    return (
        <>
            <div className="logo">
                <img src='../assets/logo.svg' alt="logo"/>
            </div>
            <div className="navigation">
                <p>About</p>
                <p>Sign In</p>
                <p>Sign Up</p>
            </div>
        </>
    )
}

export default Header
