# Zest Frontend

The client-side application for the Zest trading platform, built with React 19 and Vite. It provides a responsive interface for authentication, portfolio management, and trade execution.

---

## Tech Stack

- **React 19** with functional components and hooks
- **Vite** for development server and bundling
- **React Router v7** for client-side routing
- **Axios** for HTTP requests
- **Material UI (MUI v9)** for UI components and icons
- **Tailwind CSS v4** for utility-based styling

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- The backend server running (see [backend/README.md](../backend/README.md))

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend/` root:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`.

---

## Available Scripts

| Script          | Description                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Start the Vite development server        |
| `npm run build` | Build the app for production             |
| `npm run preview` | Preview the production build locally   |
| `npm run lint`  | Run ESLint across the project            |

---

## Environment Variables

| Variable        | Required | Description                        | Example                      |
|-----------------|----------|------------------------------------|------------------------------|
| `VITE_API_URL`  | Yes      | Base URL of the backend API server | `http://localhost:3000`      |

> All Axios requests in the app use `import.meta.env.VITE_API_URL` as the base URL. The app will fail to communicate with the backend if this variable is not set.

---

## Folder Structure

```
frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── assets/              # Logo images and static assets
    ├── components/          # Reusable modal components
    │   ├── buyActionWindow.jsx    # Buy order modal (CNC / MIS, Market / Limit)
    │   └── sellActionWindow.jsx   # Sell order modal
    ├── data/
    │   └── data.js          # Static stock data used in the watchlist/order forms
    ├── hooks/
    │   └── useTheme.js      # Custom hook for dark/light theme state
    ├── landing_page/        # Public-facing pages (no auth required)
    │   ├── home/            # Landing home page with hero, stats, ecosystem, pricing sections
    │   ├── about/           # About page with team section
    │   ├── products/        # Products showcase page
    │   ├── pricing/         # Pricing and brokerage breakdown page
    │   ├── support/         # Support page with ticket form
    │   ├── login/           # Login form and page wrapper
    │   ├── signup/          # Signup form and page wrapper
    │   ├── navbar.jsx        # Landing page navigation bar
    │   ├── footer.jsx        # Shared footer
    │   ├── openAccount.jsx   # CTA component
    │   └── NotFound.jsx      # 404 page
    └── user_page/           # Authenticated dashboard views
        ├── dashboard/
        │   ├── dashboard.jsx  # Root dashboard — handles auth verification and layout
        │   ├── summary.jsx    # Portfolio summary with TradingView chart
        │   └── dashboard.css
        ├── holdings/
        │   └── holdings.jsx   # CNC holdings table with P&L
        ├── positions/
        │   └── positions.jsx  # MIS intraday positions table
        ├── orders/
        │   └── orders.jsx     # Full order history table
        ├── funds/
        │   └── funds.jsx      # Fund management — balance, add/withdraw, transaction history
        ├── sidebar.jsx        # Dashboard sidebar with watchlist
        └── navbar.jsx         # Dashboard top navigation bar with logout
```

---

## Pages and Routes

| Route              | Component        | Auth Required | Description                            |
|--------------------|------------------|---------------|----------------------------------------|
| `/`                | `HomePage`       | No            | Public landing page                    |
| `/about`           | `AboutPage`      | No            | About the platform                     |
| `/product`         | `ProductPage`    | No            | Products overview                      |
| `/pricing`         | `PricingPage`    | No            | Brokerage and pricing details          |
| `/support`         | `SupportPage`    | No            | Support and ticket submission          |
| `/signup`          | `SignupPage`     | No            | User registration                      |
| `/login`           | `LoginPage`      | No            | User login                             |
| `/dashboard`       | `Dashboard`      | Yes           | Portfolio summary with chart           |
| `/dashboard/orders`    | `Orders`     | Yes           | Order history                          |
| `/dashboard/holdings`  | `Holdings`   | Yes           | Long-term CNC holdings                 |
| `/dashboard/positions` | `Positions`  | Yes           | Intraday MIS positions                 |
| `/dashboard/funds`     | `Funds`      | Yes           | Fund management                        |
| `*`                | `NotFound`       | No            | 404 fallback                           |

> Auth protection is handled inside `dashboard.jsx` — it calls `POST /verify` on mount and redirects to `/login` if the session is invalid.

---

## Key Components

### `buyActionWindow.jsx` / `sellActionWindow.jsx`

Modal dialogs for placing orders. Accept a `stock` prop (name, price, exchange) and an `onClose` callback.

**Features:**
- Toggle between CNC (Delivery) and MIS (Intraday) product types
- Toggle between Market and Limit order types
- Quantity controls with +/- buttons
- Live margin required calculation (MIS applies 5x leverage / 20% margin)
- Success state with animation on order confirmation

### `summary.jsx`

The main dashboard view. Embeds a live TradingView Advanced Chart widget showing NSE:NIFTY by default, with theme-aware dark/light switching. Also displays portfolio totals pulled from holdings, orders, and funds APIs.

### `sidebar.jsx`

Persistent dashboard sidebar. Fetches and displays the user's watchlist from `GET /allWatchlist`. Each watchlist item shows stock name, exchange, price, and percentage change with up/down colouring. Clicking a stock opens the buy order modal.
