# Zest Backend

The Express.js and Node.js backend for the Zest trading platform. It handles user authentication via JWT, manages virtual account balances, and executes simulated trades by modifying the MongoDB database.

## How to Install and Run

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the server (uses nodemon for hot-reloading):
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the root of the `backend` directory. The application will not start without `MONGO_URI` and `JWT_SECRET`.

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/zest
JWT_SECRET=your_super_secret_jwt_key
```

## API Endpoints

### Authentication Routes (`/`)
- `POST /signup` - Register a new user. (Body: `name`, `email`, `password`)
- `POST /login` - Authenticate an existing user. (Body: `email`, `password`)
- `POST /verify` - Verify active JWT session cookie.
- `POST /logout` - Clear authentication cookie.

### Trading Routes (Require Authentication)
- `GET /allHoldings` - Fetch long-term portfolio data (CNC).
- `GET /allPositions` - Fetch intraday trade data (MIS).
- `GET /allWatchlist` - Fetch user's saved watchlist.
- `GET /allOrders` - Fetch order history.
- `POST /newOrder` - Place a new buy or sell order. (Body: `instrument`, `type`, `qty`, `price`, `productType`, etc.)

### Fund Management Routes (Require Authentication)
- `GET /getFunds` - Retrieve balance, margin, and transaction history.
- `POST /addFunds` - Simulate depositing money. (Body: `amount`, `paymentMethod`)
- `POST /withdrawFunds` - Simulate withdrawing money. (Body: `amount`)
- `POST /resetFunds` - Reset account balance and transactions to default test state.

## Database Models

- **User**: Stores authentication credentials, available balance, and used margin.
- **Holding**: Represents long-term stocks bought as Delivery (CNC).
- **Position**: Represents short-term Intraday (MIS) trades (including short selling).
- **Watchlist**: List of stocks the user is tracking.
- **Order**: Ledger of every buy/sell action requested.
- **Transaction**: Ledger of fund deposits and withdrawals.
