import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
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

    const getPasswordStrength = () => {
        const len = formData.password.length;
        if (len === 0) return { label: '', strength: 0 };
        if (len < 6) return { label: 'Weak password (min 6 chars)', strength: 1 };
        if (len < 10) return { label: 'Medium password', strength: 2 };
        return { label: 'Strong password', strength: 3 };
    };

    const { label: strengthLabel, strength } = getPasswordStrength();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.name || !formData.email || !formData.password) {
            setError('All fields are required.');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/signup`,
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                },
                { withCredentials: true }
            );

            if (response.data.success) {
                setSuccess('Account created successfully! Redirecting...');
                localStorage.setItem('username', response.data.user.name);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
            } else {
                setError(response.data.message || 'Signup failed.');
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.response?.data?.message || 'Server error. Please try again.');
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
                            <h1 className="display-lg text-on-surface mb-4">Invest in your <br />financial future.</h1>
                            <p className="body-lg text-on-surface-variant max-w-md">Join millions of investors and start your wealth creation journey with our intuitive platform.</p>
                        </div>

                        <div className="signup-features">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <span className="material-symbols-outlined">percent</span>
                                </div>
                                <div>
                                    <h3 className="title-lg text-on-surface mb-1">Zero brokerage</h3>
                                    <p className="body-md text-on-surface-variant">Keep more of your money with zero brokerage on all equity investments.</p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <span className="material-symbols-outlined">insights</span>
                                </div>
                                <div>
                                    <h3 className="title-lg text-on-surface mb-1">Intuitive tools</h3>
                                    <p className="body-md text-on-surface-variant">Access simple, powerful trading tools designed for both beginners and pros.</p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <span className="material-symbols-outlined">groups</span>
                                </div>
                                <div>
                                    <h3 className="title-lg text-on-surface mb-1">10M+ Users</h3>
                                    <p className="body-md text-on-surface-variant">Trusted by a growing community of millions of investors worldwide.</p>
                                </div>
                            </div>
                        </div>

                        <div className="security-badge">
                            <span className="material-symbols-outlined badge-icon">verified_user</span>
                            <span className="body-md text-on-surface-variant">Bank-grade security & encryption</span>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="signup-form-card">
                        <div className="mb-8">
                            <h2 className="headline-lg text-on-surface mb-2 mobile-only">Get started with Zest</h2>
                            <p className="body-md text-on-surface-variant mb-6 mobile-only">Join millions of investors and start your wealth creation journey.</p>
                            <h2 className="headline-md text-on-surface mb-2 desktop-only">Create Account</h2>
                        </div>

                        {error && <div className="form-error">{error}</div>}
                        {success && <div className="form-success">{success}</div>}

                        <form className="signup-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="label-md text-on-surface-variant" htmlFor="name">Full Name</label>
                                <input
                                    className="form-input"
                                    id="name"
                                    placeholder="John Doe"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

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

                                {/* Strength Indicator */}
                                <div className="password-strength">
                                    <div className="strength-bar">
                                        <div className={`strength-fill ${strength >= 1 ? (strength === 1 ? 'weak' : strength === 2 ? 'medium' : 'strong') : ''}`}></div>
                                    </div>
                                    <div className="strength-bar">
                                        <div className={`strength-fill ${strength >= 2 ? (strength === 2 ? 'medium' : 'strong') : ''}`}></div>
                                    </div>
                                    <div className="strength-bar">
                                        <div className={`strength-fill ${strength >= 3 ? 'strong' : ''}`}></div>
                                    </div>
                                </div>
                                {strengthLabel && (
                                    <p className={`label-md mt-1 font-semibold ${strength === 1 ? 'text-error' : strength === 2 ? 'text-warning' : 'text-success'}`} style={{ color: strength === 1 ? '#ea4335' : strength === 2 ? '#fbbc05' : '#34a853' }}>
                                        {strengthLabel}
                                    </p>
                                )}
                            </div>

                            <div className="form-actions">
                                <button
                                    className="btn btn-primary btn-block"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                </button>
                            </div>
                        </form>

                        <div className="divider">
                            <span className="label-md text-on-surface-variant">OR</span>
                        </div>

                        <div className="mt-6 text-center">
                            <span className="body-md text-on-surface-variant" style={{ marginRight: '8px' }}>Already have an account?</span>
                            <Link className="body-md text-primary font-semibold hover-underline" to="/login">Log In</Link>
                        </div>

                        <p className="label-md text-on-surface-variant text-center mt-4">
                            By creating an account, you agree to our <a className="text-primary hover-underline" href="#">Terms</a> and <a className="text-primary hover-underline" href="#">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Signup;
