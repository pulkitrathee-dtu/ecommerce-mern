# E-Commerce Demo (MERN)

A small full-stack shop I built to practice using data structures in a real backend.

## What it does
- Browse products and filter them by price range
- Add items to a cart, change quantities, remove items

## The two DSA parts

**Price filter: binary search.** When the server starts, products are loaded from
MongoDB into an array sorted by price. The filter endpoint uses binary search
(`backend/utils/binarySearch.js`) to find where the price range starts and ends,
instead of checking every product. Finding the range is O(log N).

**Cart: Map.** The cart is a JavaScript Map of productId to quantity
(`backend/services/cartStore.js`), so add, update and remove are O(1) on average.

## Tech
React, Node.js, Express, MongoDB (Mongoose)

## Run locally
1. Start MongoDB (local or Atlas) and copy `backend/.env.example` to `backend/.env`
2. Backend: `cd backend`, `npm install`, `npm run seed`, `npm start`
3. Frontend (new terminal): `cd frontend`, `npm install`, `npm start`
4. Open http://localhost:3000

## Limitations
- One shared cart, no login
- Products are cached at startup, so restart the server after changing them in the database
- No automated tests yet
