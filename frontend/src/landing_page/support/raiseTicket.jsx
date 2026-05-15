import React from 'react';
import './style.css';

function RaiseTicket() {
  return (
    <>
      <section className="support-ticket-section py-xl">
        <div className="max-w-7xl mx-auto px-margin support-ticket-layout gap-10">
          <div>
            <div className="support-ticket-card card support-ticket-card-shadow">
              <div className="mb-8">
                <span className="support-label">Submit a support ticket</span>
                <h2 className="headline-lg mt-3">Need help from our support team?</h2>
                <p className="body-md text-on-surface-variant mt-4">Fill in the form and our team will contact you shortly. For urgent issues, use instant chat or call our support line.</p>
              </div>

              <form className="support-form grid gap-6">
                <div className="support-form-grid gap-4">
                  <label className="form-field">
                    <span className="label-md text-on-surface-variant">Full Name</span>
                    <input className="form-input" type="text" placeholder="John Doe" />
                  </label>
                  <label className="form-field">
                    <span className="label-md text-on-surface-variant">Email address</span>
                    <input className="form-input" type="email" placeholder="john@example.com" />
                  </label>
                </div>

                <label className="form-field">
                  <span className="label-md text-on-surface-variant">Category</span>
                  <select className="form-input" defaultValue="">
                    <option value="" disabled>Select a category</option>
                    <option value="account">Account Issues</option>
                    <option value="trading">Trading Platform</option>
                    <option value="payment">Deposit / Withdrawal</option>
                    <option value="bug">Bug Report</option>
                  </select>
                </label>

                <label className="form-field">
                  <span className="label-md text-on-surface-variant">Subject</span>
                  <input className="form-input" type="text" placeholder="Brief subject" />
                </label>

                <label className="form-field">
                  <span className="label-md text-on-surface-variant">Message</span>
                  <textarea className="form-input support-textarea" rows="6" placeholder="Describe your issue or question"></textarea>
                </label>

                <button className="btn btn-primary support-submit-button" type="submit">Submit Ticket</button>
              </form>

              <div className="support-contact-grid mt-10 gap-4">
                <div className="support-contact-card">
                  <span className="material-symbols-outlined support-contact-icon">call</span>
                  <div>
                    <p className="label-md text-on-surface-variant">Call support</p>
                    <p className="body-md">+1 (800) 555-ZEST</p>
                  </div>
                </div>
                <div className="support-contact-card">
                  <span className="material-symbols-outlined support-contact-icon">mail</span>
                  <div>
                    <p className="label-md text-on-surface-variant">Email us</p>
                    <p className="body-md">support@zestbroking.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="support-side-panel flex flex-col gap-6">
            <div className="card support-panel-card support-panel-accent">
              <p className="label-md uppercase support-tracking text-primary mb-3">Priority access</p>
              <h3 className="title-lg mb-3">Premium members get faster response</h3>
              <p className="body-md text-on-surface-variant mb-5">Upgrade to Elite or Premium and enjoy instant chat, direct line support, and dedicated account guidance.</p>
              <a className="btn btn-outline hover-underline" href="#">Upgrade now</a>
            </div>

            <div className="card support-panel-card support-solution-card">
              <div className="support-solution-icon bg-primary-fixed">
                <span className="material-symbols-outlined text-primary">lightbulb</span>
              </div>
              <div>
                <h3 className="title-lg mb-2">Need an answer now?</h3>
                <p className="body-md text-on-surface-variant">Use the live agent chat in the bottom corner, or browse our most-viewed self-service articles.</p>
              </div>
            </div>

            <div className="card support-panel-card">
              <h4 className="title-lg mb-3">Fast links</h4>
              <ul className="support-quick-links">
                <li><a className="support-link hover-underline" href="#">Reset password</a></li>
                <li><a className="support-link hover-underline" href="#">Review account status</a></li>
                <li><a className="support-link hover-underline" href="#">Billing questions</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export default RaiseTicket;
