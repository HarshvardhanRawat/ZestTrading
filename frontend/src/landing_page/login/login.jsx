import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.email || !formData.password) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:3000/login',
                {
                    email: formData.email,
                    password: formData.password
                },
                { withCredentials: true }
            );

            if (response.data.success) {
                setSuccess('Logged in successfully! Redirecting...');
                localStorage.setItem('username', response.data.user.name);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
            } else {
                setError(response.data.message || 'Login failed.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <main className="signup-main">
                <div className="signup-grid">
                    {/* Trust Elements / Branding Side */}
                    <div className="signup-trust-elements">
                        <div>
                            <h1 className="display-lg text-on-surface mb-4">Welcome back <br />to Zest Trading.</h1>
                            <p className="body-lg text-on-surface-variant max-w-md">Log in to manage your portfolio, track live watchlist data, and place instant trades.</p>
                        </div>

                        <div className="signup-features">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <span className="material-symbols-outlined">bolt</span>
                                </div>
                                <div>
                                    <h3 className="title-lg text-on-surface mb-1">Fast Execution</h3>
                                    <p className="body-md text-on-surface-variant">Experience lightning-fast order matching and processing.</p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <span className="material-symbols-outlined">security</span>
                                </div>
                                <div>
                                    <h3 className="title-lg text-on-surface mb-1">Encrypted Sessions</h3>
                                    <p className="body-md text-on-surface-variant">Your login session is protected with industry-standard cryptographic JWT tokens.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="signup-form-card">
                        <div className="mb-8">
                            <h2 className="headline-lg text-on-surface mb-2 mobile-only">Log in to Zest</h2>
                            <p className="body-md text-on-surface-variant mb-6 mobile-only">Enter your credentials to access your trading desk.</p>
                            <h2 className="headline-md text-on-surface mb-2 desktop-only">Account Login</h2>
                        </div>

                        {error && <div className="form-error">{error}</div>}
                        {success && <div className="form-success">{success}</div>}

                        <form className="signup-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="label-md text-on-surface-variant" htmlFor="email">Email Address</label>
                                <input
                                    className="form-input"
                                    id="email"
                                    placeholder="john@example.com"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="label-md text-on-surface-variant" htmlFor="password">Password</label>
                                <div className="password-input-wrapper">
                                    <input
                                        className="form-input"
                                        id="password"
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        className="password-toggle"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                                    >
                                        <span className="material-symbols-outlined text-lg">
                                            {showPassword ? "visibility" : "visibility_off"}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button
                                    className="btn btn-primary btn-block"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Log In'}
                                </button>
                            </div>
                        </form>

                        <div className="divider">
                            <span className="label-md text-on-surface-variant">OR</span>
                        </div>

                        <div className="mt-6 text-center">
                            <span className="body-md text-on-surface-variant" style={{ marginRight: '8px' }}>New to Zest?</span>
                            <Link className="body-md text-primary font-semibold hover-underline" to="/signup">Create Account</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Login;
