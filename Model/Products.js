const mongoose = require('mongoose');
const Products = new mongoose.Schema({
 title:{type:String,},
 price:{type:String, },
 description:{type:String,},
 image: {
    imageName: String,
    imageData: String, 
  },
 quantity:{type:Number,},
});
const ProductModel = mongoose.model('Products', Products);
module.exports = ProductModel;



