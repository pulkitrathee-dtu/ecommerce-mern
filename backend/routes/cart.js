const express = require('express');
const router = express.Router();
const cartStore = require('../services/cartStore');
const productCache = require('../services/productCache');

// Attach product details (name, price) to each cart line for the frontend.
function enrichCart(cartEntries) {
  return cartEntries.map((entry) => {
    const product = productCache.getProductById(entry.productId);
    return {
      productId: entry.productId,
      quantity: entry.quantity,
      name: product ? product.name : 'Unknown product',
      price: product ? product.price : 0,
    };
  });
}

// GET /api/cart
router.get('/', (req, res) => {
  res.json(enrichCart(cartStore.getCart()));
});

// POST /api/cart/add  { productId, quantity }
router.post('/add', (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId) return res.status(400).json({ error: 'productId is required' });

  const newQuantity = cartStore.addToCart(productId, quantity && quantity > 0 ? quantity : 1);
  res.json({ productId, quantity: newQuantity });
});

// PUT /api/cart/update  { productId, quantity }
router.put('/update', (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || quantity === undefined) {
    return res.status(400).json({ error: 'productId and quantity are required' });
  }

  const newQuantity = cartStore.updateCartItem(productId, Number(quantity));
  res.json({ productId, quantity: newQuantity });
});

// DELETE /api/cart/:productId
router.delete('/:productId', (req, res) => {
  const removed = cartStore.removeFromCart(req.params.productId);
  res.json({ removed });
});

module.exports = router;
