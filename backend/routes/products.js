const express = require('express');
const router = express.Router();
const productCache = require('../services/productCache');

// GET /api/products - full catalog, already sorted by price ascending
router.get('/', (req, res) => {
  res.json(productCache.getAllProducts());
});

// GET /api/products/filter?min=100&max=5000 - O(log N) binary search filter
router.get('/filter', (req, res) => {
  const min = Number(req.query.min);
  const max = Number(req.query.max);

  if (Number.isNaN(min) || Number.isNaN(max)) {
    return res.status(400).json({ error: 'min and max query params must be numbers' });
  }
  if (min > max) {
    return res.status(400).json({ error: 'min cannot be greater than max' });
  }

  const results = productCache.filterProductsByPrice(min, max);
  res.json(results);
});

module.exports = router;
