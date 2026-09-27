const mongoose = require('mongoose');

// Simple, interview-friendly schema. Only fields we actually use are included.
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, index: true }, // indexed since we sort/query by price
  category: { type: String, default: 'general' },
  description: { type: String, default: '' },
  stock: { type: Number, default: 100 },
});

module.exports = mongoose.model('Product', productSchema);
