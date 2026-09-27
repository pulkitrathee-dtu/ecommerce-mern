import React, { useEffect, useState } from 'react';
import {
  getAllProducts,
  filterProductsByPrice,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from './api';
import { CategoryIcon, styleFor } from './categoryIcons';

function App() {
  const [allProducts, setAllProducts] = useState([]); // full catalog, for the ruler + overall range
  const [products, setProducts] = useState([]); // currently displayed (all, or filtered)
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAllProducts();
    refreshCart();
  }, []);

  async function loadAllProducts() {
    setLoading(true);
    setError('');
    try {
      const data = await getAllProducts();
      setAllProducts(data);
      setProducts(data);
    } catch (err) {
      setError('Could not reach the backend. Is it running on port 5000?');
    } finally {
      setLoading(false);
    }
  }

  async function handleFilter() {
    if (minPrice === '' || maxPrice === '') {
      setError('Enter both a minimum and maximum price.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await filterProductsByPrice(Number(minPrice), Number(maxPrice));
      setProducts(data);
    } catch (err) {
      setError('Filter request failed.');
    } finally {
      setLoading(false);
    }
  }

  function handleClearFilter() {
    setMinPrice('');
    setMaxPrice('');
    setError('');
    setProducts(allProducts);
  }

  async function refreshCart() {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      // Cart is non-critical for the initial view; fail silently here.
    }
  }

  async function handleAddToCart(productId) {
    await addToCart(productId, 1);
    refreshCart();
  }

  async function handleQuantityChange(productId, newQuantity) {
    await updateCartItem(productId, newQuantity);
    refreshCart();
  }

  async function handleRemove(productId) {
    await removeFromCart(productId);
    refreshCart();
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ---- Price ruler math: places every product on a line by price, ----
  // ---- and highlights the ticks that fall inside the active [min, max] query. ----
  const catalogMin = allProducts.length ? allProducts[0].price : 0;
  const catalogMax = allProducts.length ? allProducts[allProducts.length - 1].price : 0;
  const span = Math.max(catalogMax - catalogMin, 1);
  const activeMin = minPrice !== '' ? Number(minPrice) : null;
  const activeMax = maxPrice !== '' ? Number(maxPrice) : null;

  function percentFor(price) {
    return ((price - catalogMin) / span) * 100;
  }

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1>Catalog</h1>
          <p className="subtitle">Browse products, filter by price, and build your cart.</p>
        </div>
        {allProducts.length > 0 && (
          <p className="header-count mono">{allProducts.length} products</p>
        )}
      </header>

      <section className="filter-bar">
        <label htmlFor="min-price">Price range</label>
        <input
          id="min-price"
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
        <button className="secondary" onClick={handleClearFilter}>
          Clear
        </button>
      </section>

      {allProducts.length > 0 && (
        <section className="ruler">
          <p className="ruler-label">
            Sorted catalog by price — {allProducts.length} products, {products.length} shown
          </p>
          <div className="ruler-track">
            {activeMin !== null && activeMax !== null && activeMax >= activeMin && (
              <div
                className="ruler-range"
                style={{
                  left: `${Math.max(percentFor(activeMin), 0)}%`,
                  width: `${Math.min(percentFor(activeMax), 100) - Math.max(percentFor(activeMin), 0)}%`,
                }}
              />
            )}
            {allProducts.map((p) => {
              const inRange =
                activeMin !== null && activeMax !== null && p.price >= activeMin && p.price <= activeMax;
              return (
                <div
                  key={p._id}
                  className={`ruler-tick${inRange ? ' in-range' : ''}`}
                  style={{ left: `${percentFor(p.price)}%` }}
                  title={`${p.name} — ₹${p.price}`}
                />
              );
            })}
          </div>
          <div className="ruler-ends mono">
            <span>₹{catalogMin}</span>
            <span>₹{catalogMax}</span>
          </div>
        </section>
      )}

      {error && <p className="error">{error}</p>}

      <main className="main-layout">
        <section className="product-grid">
          {products.map((p) => {
            const style = styleFor(p.category);
            return (
              <div className="product-card" key={p._id}>
                <div className="icon-tile" style={{ background: style.tint, color: style.color }}>
                  <CategoryIcon category={p.category} />
                </div>
                <h3>{p.name}</h3>
                <div className="product-meta">
                  <span className="price">₹{p.price}</span>
                  <span className="category">{p.category}</span>
                </div>
                <button onClick={() => handleAddToCart(p._id)}>Add to cart</button>
              </div>
            );
          })}
          {!loading && products.length === 0 && (
            <p className="empty-note">No products in this range — try widening it, or Clear.</p>
          )}
        </section>

        <aside className="cart">
          <div className="cart-heading">
            <h2>Cart</h2>
            {cartItemCount > 0 && <span className="cart-badge mono">{cartItemCount}</span>}
          </div>

          {cart.length === 0 && (
            <p className="empty-cart">Add something from the catalog to get started.</p>
          )}

          {cart.map((item) => (
            <div className="cart-item" key={item.productId}>
              <div className="cart-item-name">
                <span>{item.name}</span>
                <span className="mono">₹{item.price}</span>
              </div>
              <div className="qty-controls">
                <button
                  className="secondary"
                  onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  className="secondary"
                  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                >
                  +
                </button>
                <button className="remove-btn" onClick={() => handleRemove(item.productId)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          {cart.length > 0 && (
            <div className="cart-total">
              <span>Total</span>
              <span className="mono">₹{cartTotal}</span>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

export default App;
