// Run with: npm run seed
// Connects to MongoDB and inserts a fixed set of sample products,
// wiping any existing ones first so the demo is reproducible.
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const sampleProducts = [
  { name: 'USB-C Cable', price: 149, category: 'accessories', description: '1m fast-charging cable', stock: 200 },
  { name: 'Wired Earphones', price: 299, category: 'audio', description: 'In-ear, 3.5mm jack', stock: 150 },
  { name: 'Phone Stand', price: 349, category: 'accessories', description: 'Adjustable desk stand', stock: 120 },
  { name: 'Mouse Pad', price: 399, category: 'accessories', description: 'Large, non-slip base', stock: 180 },
  { name: 'Wireless Mouse', price: 699, category: 'peripherals', description: '2.4GHz wireless mouse', stock: 100 },
  { name: 'Bluetooth Speaker', price: 999, category: 'audio', description: 'Portable, 10W output', stock: 80 },
  { name: 'Keyboard (Membrane)', price: 1199, category: 'peripherals', description: 'Full-size, plug and play', stock: 90 },
  { name: 'Laptop Sleeve', price: 1299, category: 'bags', description: '14-inch padded sleeve', stock: 70 },
  { name: 'Webcam 1080p', price: 1799, category: 'peripherals', description: 'Full HD with mic', stock: 60 },
  { name: 'Power Bank 10000mAh', price: 1999, category: 'accessories', description: 'Dual USB output', stock: 100 },
  { name: 'Mechanical Keyboard', price: 2999, category: 'peripherals', description: 'Blue switches, RGB', stock: 50 },
  { name: 'Backpack', price: 3499, category: 'bags', description: 'Water-resistant, laptop compartment', stock: 65 },
  { name: 'Gaming Mouse', price: 3999, category: 'peripherals', description: '16000 DPI, programmable buttons', stock: 55 },
  { name: 'Desk Lamp (LED)', price: 4499, category: 'home-office', description: 'Adjustable brightness', stock: 40 },
  { name: 'Monitor Stand Riser', price: 4999, category: 'home-office', description: 'Wooden, with storage', stock: 45 },
  { name: 'Noise Cancelling Headphones', price: 7999, category: 'audio', description: 'Over-ear, 30hr battery', stock: 35 },
  { name: '27-inch Monitor', price: 15999, category: 'peripherals', description: 'IPS, 75Hz', stock: 25 },
  { name: 'Mechanical Keyboard (Wireless)', price: 8999, category: 'peripherals', description: 'Hot-swappable, wireless', stock: 30 },
  { name: 'Tablet (10-inch)', price: 18999, category: 'electronics', description: '64GB, WiFi only', stock: 20 },
  { name: 'Smartwatch', price: 9999, category: 'wearables', description: 'AMOLED display, GPS', stock: 40 },
  { name: 'External SSD 1TB', price: 6999, category: 'storage', description: 'USB 3.2, portable', stock: 45 },
  { name: 'Graphics Tablet', price: 5499, category: 'peripherals', description: '10x6 inch drawing area', stock: 30 },
  { name: 'Router (WiFi 6)', price: 5999, category: 'networking', description: 'Dual-band, 4 antennas', stock: 35 },
  { name: 'Laptop (Entry Level)', price: 34999, category: 'electronics', description: 'i3, 8GB RAM, 256GB SSD', stock: 15 },
  { name: 'Laptop (Mid Range)', price: 59999, category: 'electronics', description: 'i5, 16GB RAM, 512GB SSD', stock: 10 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce_dsa');
    console.log('Connected to MongoDB. Seeding...');

    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);

    console.log(`Inserted ${sampleProducts.length} products.`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
