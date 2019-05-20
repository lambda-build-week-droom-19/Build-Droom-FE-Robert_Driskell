import React from 'react'

export default function Button() {
    return (
        <div className={`btn ${props.style}`}>
            <Link to={props.link}>
                <button>{props.text}</button>
            </Link>
        </div>
    )
}
