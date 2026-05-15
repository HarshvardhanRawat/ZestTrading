import React from "react";

const Funds = () => {
  const transactions = [
    { type: "Funds Added", desc: "UPI Transaction ID: 412290811", date: "Oct 24, 2023, 10:45 AM", amount: "+ ₹ 25,000.00", status: "Success", typeClass: "add", statusClass: "success" },
    { type: "Withdrawal Requested", desc: "Transfer to HDFC Bank (xxxx8812)", date: "Oct 22, 2023, 03:12 PM", amount: "₹ 12,000.00", status: "Pending", typeClass: "withdraw", statusClass: "pending" },
    { type: "Funds Added", desc: "Netbanking ID: 90012234", date: "Oct 20, 2023, 11:20 AM", amount: "+ ₹ 7,910.45", status: "Success", typeClass: "add", statusClass: "success" },
  ];

  return (
    <div className="funds-container">
      <div className="funds-hero">
        <div className="balance-card">
          <div className="top">
            <span className="label">Available Margin</span>
            <h2 className="balance">₹ 4,82,910.45</h2>
          </div>
          <div className="bottom-grid">
            <div className="item">
              <span className="label">Opening Balance</span>
              <span className="val">₹ 4,50,000.00</span>
            </div>
            <div className="item">
              <span className="label">Pay-in Amount</span>
              <span className="val secondary">+ ₹ 32,910.45</span>
            </div>
          </div>
        </div>
        <div className="actions-cards">
          <button className="btn-action primary">
            <span className="material-symbols-outlined">add_circle</span>
            <span>Add Funds</span>
          </button>
          <button className="btn-action outline">
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
          <span className="val">₹ 1,20,400.00</span>
        </div>
        <div className="margin-card">
          <span className="label">Available Cash</span>
          <span className="val">₹ 3,62,510.45</span>
        </div>
        <div className="margin-card">
          <span className="label">Collateral Value</span>
          <span className="val">₹ 0.00</span>
        </div>
        <div className="margin-card">
          <span className="label">Total Margin</span>
          <span className="val">₹ 4,82,910.45</span>
        </div>
      </div>

      <div className="transactions-section">
        <div className="section-header">
          <h3>Recent Transactions</h3>
          <button className="btn-link">View All</button>
        </div>
        <div className="transactions-list">
          {transactions.map((tx, index) => (
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
                <span className={tx.typeClass === "add" ? "secondary" : ""}>{tx.amount}</span>
              </div>
              <div className="tx-status">
                <span className={`status-tag ${tx.statusClass}`}>{tx.status}</span>
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default Funds;
