import React, { useState, useEffect } from "react";

const BuyActionWindow = ({ stock, onClose }) => {
  if (!stock) return null;

  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(stock.price ? stock.price.toFixed(2) : "0.00");
  const [productType, setProductType] = useState("CNC"); // CNC (Delivery) or MIS (Intraday)
  const [orderType, setOrderType] = useState("MARKET"); // MARKET or LIMIT
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Update price when stock changes
  useEffect(() => {
    if (stock.price) {
      setPrice(stock.price.toFixed(2));
    }
  }, [stock]);

  // Adjust price when switching back to LIMIT
  useEffect(() => {
    if (orderType === "MARKET" && stock.price) {
      setPrice(stock.price.toFixed(2));
    }
  }, [orderType, stock]);

  const handleQtyChange = (val) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed < 1) {
      setQty(1);
    } else {
      setQty(parsed);
    }
  };

  const handlePriceChange = (val) => {
    // allow floats
    setPrice(val);
  };

  const handleBuy = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate placing order
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close window after success animation
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1000);
  };

  const currentPrice = orderType === "MARKET" ? (stock.price || 0) : parseFloat(price || 0);
  // MIS orders have 5x leverage (20% margin required)
  const marginMultiplier = productType === "MIS" ? 0.2 : 1;
  const marginRequired = (qty * currentPrice * marginMultiplier).toFixed(2);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-container buy-window ${isSuccess ? 'order-success' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {isSuccess ? (
          <div className="success-state">
            <span className="material-symbols-outlined success-icon animate-bounce">check_circle</span>
            <h2>Order Placed Successfully!</h2>
            <p>Bought {qty} shares of {stock.name} ({productType})</p>
          </div>
        ) : (
          <form onSubmit={handleBuy}>
            {/* Header */}
            <div className="modal-header buy-theme">
              <div className="header-info">
                <h3>Buy {stock.name}</h3>
                <span className="exchange-badge">{stock.exchange}</span>
              </div>
              <div className="header-price">
                <span className="ltp-label">LTP</span>
                <span className="ltp-value">₹{stock.price ? stock.price.toFixed(2) : "0.00"}</span>
              </div>
            </div>

            {/* Product Toggle (CNC / MIS) */}
            <div className="form-section">
              <label className="section-label">PRODUCT TYPE</label>
              <div className="segmented-control">
                <button
                  type="button"
                  className={productType === "CNC" ? "active cnc" : ""}
                  onClick={() => setProductType("CNC")}
                >
                  <strong>CNC</strong>
                  <span className="desc">Longterm (Delivery)</span>
                </button>
                <button
                  type="button"
                  className={productType === "MIS" ? "active mis" : ""}
                  onClick={() => setProductType("MIS")}
                >
                  <strong>MIS</strong>
                  <span className="desc">Intraday (Leveraged)</span>
                </button>
              </div>
            </div>

            {/* Order Type Toggle (Market / Limit) */}
            <div className="form-section">
              <label className="section-label">ORDER TYPE</label>
              <div className="segmented-control">
                <button
                  type="button"
                  className={orderType === "MARKET" ? "active" : ""}
                  onClick={() => setOrderType("MARKET")}
                >
                  Market
                </button>
                <button
                  type="button"
                  className={orderType === "LIMIT" ? "active" : ""}
                  onClick={() => setOrderType("LIMIT")}
                >
                  Limit
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="inputs-grid">
              <div className="input-group">
                <label htmlFor="qty-input">Quantity</label>
                <div className="input-with-controls">
                  <button 
                    type="button" 
                    className="control-btn"
                    onClick={() => handleQtyChange(qty - 1)}
                  >
                    -
                  </button>
                  <input
                    id="qty-input"
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) => handleQtyChange(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="control-btn"
                    onClick={() => handleQtyChange(qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="price-input">Price (₹)</label>
                <input
                  id="price-input"
                  type="text"
                  value={orderType === "MARKET" ? "Market Price" : price}
                  disabled={orderType === "MARKET"}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Info Summary Footer */}
            <div className="modal-summary">
              <div className="summary-row">
                <span className="summary-label">Margin Required</span>
                <span className="summary-value">₹{marginRequired}</span>
              </div>
              {productType === "MIS" && (
                <div className="summary-row badge-row">
                  <span className="leverage-badge">5x Leverage Applied</span>
                </div>
              )}
            </div>

            {/* Footer Action Buttons */}
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn-modal-cancel" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-modal-buy"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="spinner"></span>
                ) : (
                  <>Buy Order</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BuyActionWindow;
