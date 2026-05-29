import React, { useState, useEffect } from "react";

const Funds = () => {
  // Load funds state from localStorage with fallbacks
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem("zest_margin_balance");
    return saved !== null ? parseFloat(saved) : 482910.45;
  });

  const [openingBalance, setOpeningBalance] = useState(() => {
    const saved = localStorage.getItem("zest_opening_balance");
    return saved !== null ? parseFloat(saved) : 450000.00;
  });

  const [usedMargin, setUsedMargin] = useState(() => {
    const saved = localStorage.getItem("zest_used_margin");
    return saved !== null ? parseFloat(saved) : 120400.00;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("zest_transactions");
    if (saved) return JSON.parse(saved);
    return [
      {
        type: "Funds Added",
        desc: "UPI Transaction ID: 412290811",
        date: "Oct 24, 2023, 10:45 AM",
        amount: "+ ₹ 25,000.00",
        status: "Success",
        typeClass: "add",
        statusClass: "success",
      },
      {
        type: "Withdrawal Requested",
        desc: "Transfer to HDFC Bank (xxxx8812)",
        date: "Oct 22, 2023, 03:12 PM",
        amount: "- ₹ 12,000.00",
        status: "Pending",
        typeClass: "withdraw",
        statusClass: "pending",
      },
      {
        type: "Funds Added",
        desc: "Netbanking ID: 90012234",
        date: "Oct 20, 2023, 11:20 AM",
        amount: "+ ₹ 7,910.45",
        status: "Success",
        typeClass: "add",
        statusClass: "success",
      },
    ];
  });

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  // Form states
  const [amountInput, setAmountInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [withdrawInput, setWithdrawInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("zest_margin_balance", balance.toString());
    localStorage.setItem("zest_opening_balance", openingBalance.toString());
    localStorage.setItem("zest_used_margin", usedMargin.toString());
    localStorage.setItem("zest_transactions", JSON.stringify(transactions));
  }, [balance, openingBalance, usedMargin, transactions]);

  // Derived margin calculations
  const availableCash = balance - usedMargin;
  const payInAmount = balance - openingBalance;

  const formatCurrency = (val) => {
    return val.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const handleAddFunds = (e) => {
    e.preventDefault();
    const amt = parseFloat(amountInput);
    if (isNaN(amt) || amt <= 0) {
      setErrorMessage("Please enter a valid amount greater than 0");
      return;
    }

    const newBalance = balance + amt;
    const txId = Math.floor(100000000 + Math.random() * 900000000);
    const newTx = {
      type: "Funds Added",
      desc: paymentMethod === "UPI" ? `UPI Transaction ID: ${txId}` : `Netbanking Ref ID: ${txId}`,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      amount: `+ ${formatCurrency(amt)}`,
      status: "Success",
      typeClass: "add",
      statusClass: "success",
    };

    setBalance(newBalance);
    setTransactions([newTx, ...transactions]);
    setAmountInput("");
    setIsAddOpen(false);
    setErrorMessage("");
  };

  const handleWithdrawFunds = (e) => {
    e.preventDefault();
    const amt = parseFloat(withdrawInput);
    if (isNaN(amt) || amt <= 0) {
      setErrorMessage("Please enter a valid amount greater than 0");
      return;
    }

    if (amt > availableCash) {
      setErrorMessage(`Insufficient cash balance. Maximum withdrawable: ${formatCurrency(availableCash)}`);
      return;
    }

    const newBalance = balance - amt;
    const newTx = {
      type: "Withdrawal Requested",
      desc: "Transfer to Linked Bank Account",
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      amount: `- ${formatCurrency(amt)}`,
      status: "Success",
      typeClass: "withdraw",
      statusClass: "success",
    };

    setBalance(newBalance);
    setTransactions([newTx, ...transactions]);
    setWithdrawInput("");
    setIsWithdrawOpen(false);
    setErrorMessage("");
  };

  const handleResetHistory = () => {
    if (window.confirm("Are you sure you want to reset balance and transaction history to default?")) {
      localStorage.removeItem("zest_margin_balance");
      localStorage.removeItem("zest_opening_balance");
      localStorage.removeItem("zest_used_margin");
      localStorage.removeItem("zest_transactions");
      window.location.reload();
    }
  };

  return (
    <div className="funds-container">
      <div className="funds-hero">
        <div className="balance-card">
          <div className="top">
            <span className="label">Available Margin</span>
            <h2 className="balance">{formatCurrency(balance)}</h2>
          </div>
          <div className="bottom-grid">
            <div className="item">
              <span className="label">Opening Balance</span>
              <span className="val">{formatCurrency(openingBalance)}</span>
            </div>
            <div className="item">
              <span className="label">Pay-in Amount</span>
              <span className={`val ${payInAmount >= 0 ? "secondary" : "negative"}`}>
                {payInAmount >= 0 ? "+ " : ""}{formatCurrency(payInAmount)}
              </span>
            </div>
          </div>
        </div>
        <div className="actions-cards">
          <button className="btn-action primary" onClick={() => { setErrorMessage(""); setIsAddOpen(true); }}>
            <span className="material-symbols-outlined">add_circle</span>
            <span>Add Funds</span>
          </button>
          <button className="btn-action outline" onClick={() => { setErrorMessage(""); setIsWithdrawOpen(true); }}>
            <span className="material-symbols-outlined">payments</span>
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      <div className="funds-tabs">
        <button className="active">Equity</button>
        <button>Commodity</button>
      </div>

      <div className="margin-grid">
        <div className="margin-card">
          <span className="label">Used Margin</span>
          <span className="val">{formatCurrency(usedMargin)}</span>
        </div>
        <div className="margin-card">
          <span className="label">Available Cash</span>
          <span className="val">{formatCurrency(availableCash)}</span>
        </div>
        <div className="margin-card">
          <span className="label">Collateral Value</span>
          <span className="val">₹ 0.00</span>
        </div>
        <div className="margin-card">
          <span className="label">Total Margin</span>
          <span className="val">{formatCurrency(balance)}</span>
        </div>
      </div>

      <div className="transactions-section">
        <div className="section-header">
          <h3>Recent Transactions</h3>
          <button className="btn-link" onClick={handleResetHistory} style={{ color: "var(--color-error)", fontSize: "12px" }}>
            Reset Defaults
          </button>
        </div>
        <div className="transactions-list">
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <div key={index} className="tx-row">
                <div className="tx-icon">
                  <div className={`icon-circle ${tx.typeClass}`}>
                    <span className="material-symbols-outlined">
                      {tx.typeClass === "add" ? "south_west" : "north_east"}
                    </span>
                  </div>
                </div>
                <div className="tx-info">
                  <span className="type">{tx.type}</span>
                  <span className="desc">{tx.desc}</span>
                </div>
                <div className="tx-date">
                  <span>{tx.date}</span>
                </div>
                <div className="tx-amount">
                  <span className={tx.typeClass === "add" ? "secondary" : "negative"}>{tx.amount}</span>
                </div>
                <div className="tx-status">
                  <span className={`status-tag ${tx.statusClass}`}>{tx.status}</span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-on-surface-variant)" }}>
              No transactions recorded
            </div>
          )}
        </div>
      </div>

      <div className="funds-footer-grid">
        <div className="promo-card primary">
          <div className="promo-icon">
            <span className="material-symbols-outlined">verified</span>
          </div>
          <div className="promo-text">
            <h4>Boost your margin with Stocks</h4>
            <p>Pledge your holdings to get collateral margin for intraday trading.</p>
          </div>
        </div>
        <div className="promo-card grey">
          <div className="promo-icon">
            <span className="material-symbols-outlined">info</span>
          </div>
          <div className="promo-text">
            <h4>Withdrawal Timelines</h4>
            <p>Funds requested before 8:00 AM are processed by noon same day.</p>
          </div>
        </div>
      </div>

      {/* Add Funds Modal */}
      {isAddOpen && (
        <div className="analysis-modal-overlay" onClick={() => setIsAddOpen(false)}>
          <div className="analysis-modal-card mini" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="title-wrapper">
                <span className="material-symbols-outlined primary">add_circle</span>
                <h3>Add Funds</h3>
              </div>
              <button className="close-btn" onClick={() => setIsAddOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddFunds}>
              <div className="modal-body">
                {errorMessage && <div className="modal-error-message">{errorMessage}</div>}
                
                <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                  <label className="form-label" style={{ display: "block", marginBottom: "0.5rem" }}>Enter Amount (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g. 50000"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px" }}
                    required
                    min="1"
                    autoFocus
                  />
                  <div className="quick-amount-tags" style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {[10000, 25000, 50000, 100000].map(val => (
                      <span 
                        key={val} 
                        className="amount-tag" 
                        onClick={() => setAmountInput(val.toString())}
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          border: "1px solid var(--color-surface-variant)",
                          fontSize: "12px",
                          cursor: "pointer",
                          backgroundColor: amountInput === val.toString() ? "var(--color-primary-container)" : "transparent",
                          color: amountInput === val.toString() ? "var(--color-on-primary-container)" : "var(--color-on-surface)"
                        }}
                      >
                        +₹{val.toLocaleString()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: "block", marginBottom: "0.5rem" }}>Select Method</label>
                  <select 
                    className="form-input"
                    value={paymentMethod} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px" }}
                  >
                    <option value="UPI">UPI (Instant - Zero Fee)</option>
                    <option value="Netbanking">Netbanking (HDFC / ICICI / SBI)</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-close-modal outline" onClick={() => setIsAddOpen(false)} style={{ marginRight: "0.5rem" }}>
                  Cancel
                </button>
                <button type="submit" className="btn-close-modal" style={{ backgroundColor: "var(--color-primary)", color: "white" }}>
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Funds Modal */}
      {isWithdrawOpen && (
        <div className="analysis-modal-overlay" onClick={() => setIsWithdrawOpen(false)}>
          <div className="analysis-modal-card mini" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="title-wrapper">
                <span className="material-symbols-outlined primary">payments</span>
                <h3>Request Withdrawal</h3>
              </div>
              <button className="close-btn" onClick={() => setIsWithdrawOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleWithdrawFunds}>
              <div className="modal-body">
                {errorMessage && <div className="modal-error-message">{errorMessage}</div>}
                
                <div style={{ marginBottom: "1rem", fontSize: "14px", color: "var(--color-on-surface-variant)" }}>
                  Maximum Withdrawable Cash: <strong style={{ color: "var(--color-on-surface)" }}>{formatCurrency(availableCash)}</strong>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: "block", marginBottom: "0.5rem" }}>Withdrawal Amount (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g. 10000"
                    value={withdrawInput}
                    onChange={(e) => setWithdrawInput(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px" }}
                    required
                    min="1"
                    autoFocus
                  />
                  <div className="quick-amount-tags" style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {[5000, 10000, 25000, Math.floor(availableCash)].map(val => (
                      val > 0 && (
                        <span 
                          key={val} 
                          className="amount-tag" 
                          onClick={() => setWithdrawInput(val.toString())}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "4px",
                            border: "1px solid var(--color-surface-variant)",
                            fontSize: "12px",
                            cursor: "pointer",
                            backgroundColor: withdrawInput === val.toString() ? "var(--color-primary-container)" : "transparent",
                            color: withdrawInput === val.toString() ? "var(--color-on-primary-container)" : "var(--color-on-surface)"
                          }}
                        >
                          {val === Math.floor(availableCash) ? "Withdraw All" : `₹${val.toLocaleString()}`}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-close-modal outline" onClick={() => setIsWithdrawOpen(false)} style={{ marginRight: "0.5rem" }}>
                  Cancel
                </button>
                <button type="submit" className="btn-close-modal" style={{ backgroundColor: "var(--color-error)", color: "white" }}>
                  Request Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funds;
