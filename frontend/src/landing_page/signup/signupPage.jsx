import React from 'react';
import Signup from './signup';
import Navbar from '../navbar';

function SignupPage() {
    return (
        <div className="app-container">
            <Navbar />
            <Signup />
        </div>
    );
}

export default SignupPage;