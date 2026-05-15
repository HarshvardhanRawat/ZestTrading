import React from 'react';

function RightImg() {
  return (
    <section className="product-page-section product-feature-section mt-3">
      <div className="product-feature-row reverse">
        <div className="product-feature-image-container flex justify-center">
          <div className="product-feature-image-wrapper flex justify-center w-full" style={{ padding: '2rem 0' }}>
            <img
              alt="Zest Mobile App"
              className="object-cover rounded-2xl shadow-md border"
              style={{ width: '256px', height: 'auto', borderWidth: '4px', borderColor: 'var(--color-surface-container-high)', display: 'block' }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF3nsPwPbK-QqF5cgThZxvjNJqv_iTvaiTFWNlNQo1_JRxYLwFHPjZ3uosO_YtuK6sR4CXSPC1LYjtuFqarYnamUwpzHDBKHPmg6griXcU31Wl0NskYMEp4rXrFBxYtvRugCFmYdK2D385bm3mYkYMl2RJgb-CDJFlw8OGg1-0Q8x9dGnjBKeePe-KGbq03HiD0FmAn9EJeA7mQiqkoqq2YTD7HLykcMXWMFBwcoM0asZBitW_WlyqtrhUzPWp4kyTiPtRqr5chOQ"
            />
          </div>
        </div>

        <div className="product-feature-content">
          <h2 className="headline-lg text-on-background">Trading on the go.</h2>
          <p className="body-lg text-on-surface-variant">
            Never miss a market movement. The Zest Mobile app delivers full trading capabilities, real-time alerts, and portfolio management in a beautifully intuitive interface.
          </p>

          <ul className="product-feature-list">
            <li className="product-feature-list-item">
              <div className="product-feature-list-icon">
                <span className="material-symbols-outlined">notifications_active</span>
              </div>
              <div>
                <h3 className="title-lg text-on-background">Smart Alerts</h3>
                <p className="body-md text-on-surface-variant mt-2">Customizable push notifications for price triggers and news.</p>
              </div>
            </li>
            <li className="product-feature-list-item">
              <div className="product-feature-list-icon">
                <span className="material-symbols-outlined">security</span>
              </div>
              <div>
                <h3 className="title-lg text-on-background">Biometric Security</h3>
                <p className="body-md text-on-surface-variant mt-2">Secure access via Face ID or fingerprint recognition.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default RightImg;
