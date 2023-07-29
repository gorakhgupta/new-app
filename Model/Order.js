const mongoose = require('mongoose');
// Define a schema for your data
const Orders = new mongoose.Schema({
  title: { type: String, required: true},
  quantity: { type: String,},
  mobile: { type: Number, required: true},
  amount: { type: String  },
  price: { type: Number, required: true},
  address: { type: String, required: true},
  pincode : { type: Number, required: true},
  description: { type: String},
  image: { type: String},
});
// Create a model based on the schema
const OrdersModel = mongoose.model('order', Orders);

module.exports = OrdersModel;
