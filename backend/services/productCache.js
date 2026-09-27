const Product = require('../models/Product');
const { filterByPriceRange } = require('../utils/binarySearch');

/**
 * Why a cache at all?
 * MongoDB already supports range queries, but the point of this project is to
 * demonstrate binary search explicitly. We load the full catalog into memory
 * once (sorted by price), and every filter request runs against that array
 * with our own O(log N) binary search instead of hitting the DB per request.
 * A real product catalog would need a refresh/invalidation strategy when
 * products are added, priced, or removed - noted in the README.
 */

let sortedProductsCache = [];

async function loadProductCache() {
  const products = await Product.find({}).sort({ price: 1 }).lean();
  // .lean() gives plain JS objects, which is what our binary search expects.
  sortedProductsCache = products;
  console.log(`Product cache loaded: ${sortedProductsCache.length} products, sorted by price.`);
  return sortedProductsCache;
}

function getAllProducts() {
  return sortedProductsCache;
}

function getProductById(id) {
  return sortedProductsCache.find((p) => String(p._id) === String(id));
}

function filterProductsByPrice(minPrice, maxPrice) {
  return filterByPriceRange(sortedProductsCache, minPrice, maxPrice);
}

module.exports = {
  loadProductCache,
  getAllProducts,
  getProductById,
  filterProductsByPrice,
};
