import React from 'react';
import {Link} from 'react-router-dom';
import AuthOptions from './AuthOptions';

export default function Header() {
    return ( 
        <header className="header">
            <Link to="/"><h1 className="title">Auth App</h1></Link>
            <AuthOptions />
        </header>
    );
}


