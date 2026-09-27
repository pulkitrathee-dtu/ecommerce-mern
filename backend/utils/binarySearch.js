/**
 * Binary search helpers over a products array that is sorted ascending by price.
 *
 * Interview note: instead of doing `products.filter(p => p.price >= min && p.price <= max)`
 * (O(N) linear scan), we binary-search for the first index >= min ("lower bound")
 * and the last index <= max ("upper bound"), then return that contiguous slice.
 * Each search is O(log N); the slice itself is O(K) where K is the number of
 * matching results, which is unavoidable since we have to return them.
 */

/**
 * Returns the index of the first element whose price is >= target.
 * If no such element exists, returns arr.length.
 */
function lowerBound(arr, target) {
  let lo = 0;
  let hi = arr.length; // note: hi is exclusive, so it can safely equal arr.length

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid].price < target) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  return lo;
}

/**
 * Returns the index of the last element whose price is <= target.
 * If no such element exists, returns -1.
 */
function upperBound(arr, target) {
  let lo = 0;
  let hi = arr.length;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid].price <= target) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  return lo - 1;
}

/**
 * Filters a price-sorted array to the products within [minPrice, maxPrice], inclusive.
 * Runs in O(log N) to locate the range, plus O(K) to slice out the K matches.
 */
function filterByPriceRange(sortedProducts, minPrice, maxPrice) {
  if (sortedProducts.length === 0) return [];

  const startIdx = lowerBound(sortedProducts, minPrice);
  const endIdx = upperBound(sortedProducts, maxPrice);

  if (startIdx > endIdx) return []; // no products fall in this range

  return sortedProducts.slice(startIdx, endIdx + 1);
}

module.exports = { lowerBound, upperBound, filterByPriceRange };
