# Zest Backend

The Node.js and Express API server for the Zest trading platform. It handles user authentication via JWT, manages virtual account balances, and executes simulated trades by reading and writing to MongoDB.

---

## Tech Stack

- **Node.js** with **Express 5**
- **MongoDB** with **Mongoose 9** ODM
- **JSON Web Tokens (jsonwebtoken)** for session management
- **bcrypt** for password hashing
- **cookie-parser** for reading JWT from cookies
- **dotenv** for environment variable management
- **nodemon** for development hot-reloading

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- A MongoDB instance — local or [MongoDB Atlas](https://www.mongodb.com/atlas)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend/` root (see [Environment Variables](#environment-variables) below)

4. Start the server:
   ```bash
   npm start
   ```

The server will connect to MongoDB first, then start listening. If either `MONGO_URI` or `JWT_SECRET` is missing from `.env`, the process will exit immediately with an error.

---

## Environment Variables

Create a `.env` file in the `backend/` directory with the following:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/zest
JWT_SECRET=your_super_secret_jwt_key_here
```

| Variable     | Required | Description                                              |
|--------------|----------|----------------------------------------------------------|
| `PORT`       | No       | Port the server listens on. Defaults to `3000`.          |
| `MONGO_URI`  | Yes      | MongoDB connection string. App will not start without it. |
| `JWT_SECRET` | Yes      | Secret key used to sign and verify JWT tokens. App will not start without it. |

> Never commit your `.env` file. It is already listed in `.gitignore`.

---

## API Endpoints

All routes are mounted at the root `/`. Trading routes require a valid JWT session cookie (`token`).

---

### Authentication

#### `POST /signup`
Register a new user. On success, sets a `token` cookie and returns the created user.

**Request body:**
```json
{
  "name": "Harshvardhan",
  "email": "harsh@example.com",
  "password": "secret123"
}
```

**Response `201`:**
```json
{
  "message": "User created successfully",
  "success": true,
  "user": { ... }
}
```

---

#### `POST /login`
Authenticate an existing user. On success, sets a `token` cookie.

**Request body:**
```json
{
  "email": "harsh@example.com",
  "password": "secret123"
}
```

**Response `200`:**
```json
{
  "message": "User logged in successfully",
  "success": true,
  "user": { ... }
}
```

---

#### `POST /verify`
Verify the current session cookie. Used by the frontend on every dashboard mount to check if the user is still authenticated.

**Response:**
```json
{ "status": true, "user": "Harshvardhan" }
```
or
```json
{ "status": false }
```

---

#### `POST /logout`
Clears the `token` cookie and ends the session.

**Response:**
```json
{ "message": "User logged out successfully", "success": true }
```

---

### Trading Routes

> All routes below require authentication. Requests without a valid `token` cookie return `401 Unauthorized`.

---

#### `GET /allHoldings`
Returns all long-term CNC holdings for the authenticated user.

**Response `200`:** Array of holding objects.

---

#### `GET /allPositions`
Returns all intraday MIS positions for the authenticated user.

**Response `200`:** Array of position objects.

---

#### `GET /allWatchlist`
Returns the authenticated user's watchlist.

**Response `200`:** Array of watchlist stock objects.

---

#### `GET /allOrders`
Returns the full order history for the authenticated user.

**Response `200`:** Array of order objects.

---

#### `POST /newOrder`
Place a new BUY or SELL order. This is the core trading endpoint — it validates balance, updates holdings or positions, and records the order.

**Request body:**
```json
{
  "instrument": "RELIANCE",
  "exchange": "NSE",
  "type": "BUY",
  "qty": 5,
  "price": "2450.00",
  "productType": "CNC",
  "time": "10:32:45",
  "desc": "Reliance Industries Stocks"
}
```

| Field         | Values                  | Description                                     |
|---------------|-------------------------|-------------------------------------------------|
| `type`        | `"BUY"` or `"SELL"`     | Order direction                                 |
| `productType` | `"CNC"` or `"MIS"`      | Delivery or Intraday. Defaults to `"CNC"`.      |
| `qty`         | Positive integer        | Number of shares                                |
| `price`       | Decimal string          | Price per share                                 |

**BUY logic:**
- Checks user has sufficient balance (`qty × price`)
- Deducts total value from `user.balance`
- CNC: creates or updates a Holding with weighted average price
- MIS: creates or updates a Position

**SELL logic:**
- CNC: checks the user holds enough shares, deducts from Holding, adds proceeds to balance
- MIS: reduces an existing Position, or creates a short-sell Position with negative quantity

**Response `200`:**
```json
{ "message": "Order placed successfully", "user": { ... } }
```

**Error responses:**
- `400` — Insufficient balance, or insufficient shares to sell
- `500` — Internal server error

---

### Fund Management Routes

#### `GET /getFunds`
Returns the user's current balance, opening balance, used margin, and full transaction history.

**Response `200`:**
```json
{
  "balance": 482910.45,
  "openingBalance": 450000.00,
  "usedMargin": 120400.00,
  "transactions": [ ... ]
}
```

---

#### `POST /addFunds`
Simulate depositing money into the account. Supports UPI and Netbanking. Creates a transaction record.

**Request body:**
```json
{
  "amount": 10000,
  "paymentMethod": "UPI"
}
```

---

#### `POST /withdrawFunds`
Simulate withdrawing money. Validates that the withdrawal does not exceed `balance - usedMargin`.

**Request body:**
```json
{
  "amount": 5000
}
```

---

#### `POST /resetFunds`
Resets the account balance and transaction history to the default demo state. Useful for testing.

---

## Database Models

All models are user-scoped — every document contains a `userId` field referencing the User collection.

### User
Stores authentication credentials and account financials.

| Field           | Type   | Description                              |
|-----------------|--------|------------------------------------------|
| `name`          | String | Unique display name                      |
| `email`         | String | Unique email address                     |
| `password`      | String | bcrypt-hashed password (min 6 chars)     |
| `balance`       | Number | Available account balance                |
| `openingBalance`| Number | Reference balance at account open        |
| `usedMargin`    | Number | Margin currently locked in positions     |

---

### Holding
Represents a long-term stock position (CNC / Delivery).

| Field    | Type   | Description                                |
|----------|--------|--------------------------------------------|
| `name`   | String | Stock ticker symbol                        |
| `desc`   | String | Stock description                          |
| `qty`    | Number | Number of shares held                      |
| `avg`    | Number | Weighted average buy price                 |
| `ltp`    | Number | Last traded price                          |
| `curVal` | Number | Current market value (`qty × ltp`)         |
| `pl`     | Number | Profit / Loss (`curVal - qty × avg`)       |
| `chg`    | String | Percentage change string (e.g. `+2.45%`)   |
| `type`   | String | `"positive"` or `"negative"`               |

---

### Position
Represents an intraday trade (MIS). Negative `qty` indicates a short-sell position.

| Field     | Type   | Description                                |
|-----------|--------|--------------------------------------------|
| `name`    | String | Stock ticker symbol                        |
| `product` | String | Always `"MIS"`                             |
| `qty`     | Number | Shares held (negative = short position)    |
| `avg`     | Number | Average entry price                        |
| `ltp`     | Number | Last traded price                          |
| `pl`      | Number | Profit / Loss                              |
| `type`    | String | `"positive"` or `"negative"`               |

---

### Order
Immutable ledger entry for every trade placed.

| Field        | Type   | Description                                |
|--------------|--------|--------------------------------------------|
| `instrument` | String | Stock ticker symbol                        |
| `exchange`   | String | Exchange (e.g. `"NSE"`)                    |
| `type`       | String | `"BUY"` or `"SELL"`                        |
| `qty`        | String | Quantity string (e.g. `"10 / 10"`)         |
| `price`      | String | Execution price string                     |
| `status`     | String | `"Executed"` or `"Pending"`                |
| `time`       | String | Time of order placement                    |

---

### Watchlist
Stocks the user is tracking.

| Field      | Type    | Description                              |
|------------|---------|------------------------------------------|
| `name`     | String  | Stock ticker symbol                      |
| `exchange` | String  | Exchange (e.g. `"NSE"`)                  |
| `price`    | Number  | Current price                            |
| `percent`  | Number  | Day percentage change                    |
| `isDown`   | Boolean | `true` if the stock is down for the day  |

---

### Transaction
Ledger entry for every fund deposit or withdrawal.

| Field   | Type   | Description                                      |
|---------|--------|--------------------------------------------------|
| `type`  | String | `"Funds Added"` or `"Withdrawal Requested"`      |
| `desc`  | String | Payment method or reference detail               |
| `date`  | String | Human-readable date string                       |
| `amount`| String | Formatted amount string (e.g. `"+₹25,000.00"`)  |
| `status`| String | `"Success"` or `"Pending"`                       |

---

## Project Structure

```
backend/
├── controllers/
│   └── AuthController.js     # signup, login, verify, logout handlers
├── init/
│   ├── HoldingData.js         # Seed data for new user holdings
│   ├── OrdersData.js          # Seed data for new user orders
│   ├── PositionData.js        # Seed data for new user positions
│   └── WatchlistData.js       # Seed data for new user watchlist
├── model/
│   ├── UserModel.js           # Mongoose model for User
│   ├── HoldingsModel.js       # Mongoose model for Holding
│   ├── PositionModel.js       # Mongoose model for Position
│   ├── OrdersModel.js         # Mongoose model for Order
│   ├── WatchlistModel.js      # Mongoose model for Watchlist
│   └── TransactionModel.js    # Mongoose model for Transaction
├── routes/
│   ├── AuthRoute.js           # Auth route definitions
│   └── tradeRoutes.js         # All trading and fund route definitions
├── schemas/
│   ├── UserSchema.js          # Mongoose schema for User (with bcrypt hooks)
│   ├── HoldingSchema.js
│   ├── PositionSchema.js
│   ├── OrdersSchema.js
│   ├── WatchlistSchema.js
│   └── TransactionSchema.js
├── util/
│   ├── authMiddleware.js      # JWT verification + first-login data seeding
│   └── SecretToken.js         # JWT signing utility
├── index.js                   # App entry point — env validation, middleware, DB connect
└── package.json
```

---

## How New User Data Seeding Works

When a new user logs in for the first time and hits any protected route, `authMiddleware.js` checks if the user has any watchlist documents. If the count is zero, it seeds the account with sample holdings, positions, orders, watchlist stocks, and default transactions from the `init/` data files. This gives every new user a realistic-looking pre-populated portfolio to explore immediately.
