import React from 'react';
import { Link } from 'react-router-dom';

export default function Button(props) {
    return (
        <div className={`btn ${props.style}`}>
            <Link to={props.link}>
                <button>{props.text}</button>
            </Link>
        </div>
    )
}

Button.defaultProps = {
    style: '',
    link: '/',
    text: 'DEFAULT'
}