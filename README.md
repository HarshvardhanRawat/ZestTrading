# Zest Trading Platform

Zest is a modern, full-stack stock trading platform that allows users to manage their portfolios, track live watchlist data, and place instant virtual trades. It features a responsive dashboard, dynamic order matching, and a persistent fund management system.

## Tech Stack Overview

- **Frontend**: React.js, Vite, React Router, Axios, CSS modules
- **Backend**: Node.js, Express.js, JWT for Authentication
- **Database**: MongoDB (Mongoose)

## Project Structure

This repository is organized into a monolithic multi-package structure with two main directories:

- `/frontend`: Contains the React (Vite) client-side application.
- `/backend`: Contains the Node.js/Express server and MongoDB models.

## How to Run Locally

To get the full Zest project running on your local machine, you will need to start both the frontend and backend servers.

**Prerequisites:**
- Node.js (v18+ recommended)
- MongoDB (local or Atlas cluster)

**Steps:**
1. Clone the repository: `git clone <your-repo-url>`
2. Follow the instructions in the [Backend README](./backend/README.md) to start the server.
3. Follow the instructions in the [Frontend README](./frontend/README.md) to start the client.

## Demo & Screenshots

*(Add screenshots or a GIF demo of your dashboard, order window, and authentication screens here)*

![Zest Dashboard Demo](./demo-placeholder.gif)
