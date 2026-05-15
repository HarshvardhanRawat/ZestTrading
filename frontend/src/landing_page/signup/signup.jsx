import React, { useState } from 'react';
import './signup.css';

function Signup() {
    const [showPassword, setShowPassword] = useState(false);

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

                        <form className="signup-form">
                            <div className="form-group">
                                <label className="label-md text-on-surface-variant" htmlFor="fullName">Full Name</label>
                                <input
                                    className="form-input"
                                    id="fullName"
                                    placeholder="John Doe"
                                    type="text"
                                />
                            </div>

                            <div className="form-group">
                                <label className="label-md text-on-surface-variant" htmlFor="email">Email Address</label>
                                <input
                                    className="form-input"
                                    id="email"
                                    placeholder="john@example.com"
                                    type="email"
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
                                    />
                                    <button
                                        className="password-toggle"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span className="material-symbols-outlined text-lg">
                                            {showPassword ? "visibility" : "visibility_off"}
                                        </span>
                                    </button>
                                </div>

                                {/* Strength Indicator */}
                                <div className="password-strength">
                                    <div className="strength-bar">
                                        <div className="strength-fill weak"></div>
                                    </div>
                                    <div className="strength-bar"></div>
                                    <div className="strength-bar"></div>
                                </div>
                                <p className="label-md text-on-surface-variant mt-1">Weak password</p>
                            </div>

                            <div className="form-actions">
                                <button
                                    className="btn btn-primary btn-block"
                                    type="submit"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>

                        <div className="divider">
                            <span className="label-md text-on-surface-variant">OR</span>
                        </div>

                        <div className="mt-6 text-center">
                            <span className="body-md text-on-surface-variant" style={{ marginRight: '8px' }}>Already have an account?</span>
                            <a className="body-md text-primary font-semibold hover-underline" href="#">Log In</a>
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
