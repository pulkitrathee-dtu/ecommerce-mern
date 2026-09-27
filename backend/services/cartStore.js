/**
 * Cart is kept as a JavaScript Map: productId -> quantity.
 * Map gives O(1) average time for get/set/delete, which is what we want for
 * add / update / remove operations on the cart.
 *
 * This demo uses ONE shared cart for simplicity (no login system). In a real
 * app you'd key a Map of Maps by userId/sessionId - e.g.
 * `const carts = new Map(); // userId -> Map(productId -> quantity)`
 * so each user's cart lookup is still O(1). That extension is mentioned in
 * the README as the natural next step.
 */

const cart = new Map(); // productId (string) -> quantity (number)

function getCart() {
  return Array.from(cart.entries()).map(([productId, quantity]) => ({ productId, quantity }));
}

function addToCart(productId, quantity = 1) {
  const current = cart.get(productId) || 0;
  cart.set(productId, current + quantity);
  return cart.get(productId);
}

function updateCartItem(productId, quantity) {
  if (quantity <= 0) {
    cart.delete(productId);
    return 0;
  }
  cart.set(productId, quantity);
  return quantity;
}

function removeFromCart(productId) {
  return cart.delete(productId); // O(1)
}

function clearCart() {
  cart.clear();
}

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
