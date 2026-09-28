# DSA E-Commerce Demo (MERN)

A small full-stack e-commerce demo built to showcase two specific DSA optimizations
in the backend.

## What it demonstrates

### 1. Binary search for price filtering — O(log N)
On server start, all products are loaded from MongoDB, sorted by price, and kept
in memory as a plain array (`backend/services/productCache.js`). The filter endpoint
(`GET /api/products/filter?min=&max=`) does **not** scan the array with `.filter()`.
Instead, `backend/utils/binarySearch.js` implements:
- `lowerBound(arr, target)` — first index with `price >= target`
- `upperBound(arr, target)` — last index with `price <= target`

The matching range is found in O(log N), then sliced out in O(K) (K = number of
matches, unavoidable since they must be returned).

### 2. Cart management with a JavaScript Map — O(1)
`backend/services/cartStore.js` stores the cart as `Map<productId, quantity>`.
Add, update, and remove all use `Map.get/set/delete`, which are O(1) average case —
versus O(N) if the cart were an array searched by `productId` on every operation.

The demo uses a single shared cart (no login) to keep things simple. The README
below and code comments note how you'd extend this to a `Map` of per-user carts.

## Project structure

```
mern-ecommerce/
├── backend/
│   ├── data/seed.js          # populates MongoDB with sample products
│   ├── models/Product.js     # Mongoose schema
│   ├── services/
│   │   ├── productCache.js   # in-memory sorted array + binary search wiring
│   │   └── cartStore.js      # Map-based cart
│   ├── utils/binarySearch.js # lowerBound / upperBound / filterByPriceRange
│   ├── routes/products.js
│   ├── routes/cart.js
│   └── server.js
└── frontend/
    └── src/
        ├── App.js            # product grid, filter bar, cart panel
        ├── api.js            # fetch calls to the backend
        └── App.css           # plain CSS with variables, no framework
```

## Running it locally

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally, or a free MongoDB Atlas connection string

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env        # edit MONGO_URI if you're using Atlas
npm run seed                # inserts 25 sample products
npm start                   # starts the API on http://localhost:5000
```

### 2. Frontend
In a second terminal:
```bash
cd frontend
npm install
npm start                   # opens http://localhost:3000
```

The frontend expects the backend at `http://localhost:5000` (see `frontend/src/api.js`).

## API endpoints

| Method | Endpoint                          | Purpose                              |
|--------|------------------------------------|---------------------------------------|
| GET    | `/api/products`                    | All products, sorted by price         |
| GET    | `/api/products/filter?min=&max=`   | Binary-search price filter            |
| GET    | `/api/cart`                        | Current cart contents                 |
| POST   | `/api/cart/add`                    | `{ productId, quantity }`             |
| PUT    | `/api/cart/update`                 | `{ productId, quantity }`             |
| DELETE | `/api/cart/:productId`             | Remove item from cart                 |

## Known simplifications (worth naming if asked)

- No authentication — one shared cart for the whole app.
- Product cache is loaded once at server start; adding a product via the DB
  directly wouldn't appear until restart (no cache invalidation logic yet).
- No automated tests.
- No pagination on the product list.

These are reasonable things to mention proactively in an interview as "what I'd
add with more time" — it shows awareness of the gap between a demo and a
production system.
