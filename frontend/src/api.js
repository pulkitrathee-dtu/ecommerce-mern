const BASE_URL = 'http://localhost:5000/api';

export async function getAllProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
}

export async function filterProductsByPrice(min, max) {
  const res = await fetch(`${BASE_URL}/products/filter?min=${min}&max=${max}`);
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${BASE_URL}/cart`);
  return res.json();
}

export async function addToCart(productId, quantity = 1) {
  const res = await fetch(`${BASE_URL}/cart/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity }),
  });
  return res.json();
}

export async function updateCartItem(productId, quantity) {
  const res = await fetch(`${BASE_URL}/cart/update`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity }),
  });
  return res.json();
}

export async function removeFromCart(productId) {
  const res = await fetch(`${BASE_URL}/cart/${productId}`, { method: 'DELETE' });
  return res.json();
}
