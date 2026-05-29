import React from 'react';
import Login from './login';
import Navbar from '../navbar';

function LoginPage() {
    return (
        <div className="app-container">
            <Navbar />
            <Login />
        </div>
    );
}

export default LoginPage;
