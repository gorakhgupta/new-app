const app = require('express')();
const port = 5000;
const path = require('path');
const fs = require('fs');
const { connectToDatabase } = require('./db');
const express = require('express');
const multer = require('multer');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const data = require('./productData');
const UsersModel = require('./Model/Users');
const OrdersModel = require('./Model/Order');
const ProductModel = require('./Model/Products');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
connectToDatabase();
// regerster User
app.post('/register', async (req, res) => {
    try {
      const data = req.body;
      const newData = new UsersModel(data);
      await newData.save();
      res.json({ message: 'Data inserted successfully!' ,data : newData });
    } catch (err) {
      console.error('Error Registering data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //upload Image & products
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './product_uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const productUpload = multer({ storage: productStorage });
// API endpoint to handle product uploads
app.post('/addProduct', productUpload.single('image'), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const productData = req.body;
    // Read the image file and convert it to base64 (you can use other formats if needed)
    const imageData = await fs.promises.readFile(path, { encoding: 'base64' });
    // Create a new product object with name, price, and image data and save it to the database
    const newProduct = new ProductModel({
     ...productData,
      image: {
        imageName: originalname,
        imageData: imageData,
      },
    });

    await newProduct.save();
    
    res.status(201).json({ message: 'Product uploaded and saved successfully', data: newProduct});
    // Remove the temporary image file after saving to the database
    await fs.promises.unlink(path);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload and save the product' });
  }
});

  //login user

app.post('/login', async (req, res) => {
   
      const data = req.body;
      if(!data) {
        res.status(500).json({ error: 'Internal server error' });
        console.error('Error fetching data:', err); 
        return; 
      }
      const allData = await UsersModel.findOne({email: data.email});
      if(allData.password === data.password) {
      res.json({ message: 'Logged In succesfull!' ,data : allData });
      }else {
        // throw new Error("wrong credentials")
        res.status(401).send({ message: 'Wrong  ceredentials', data: null });
      console.log("wrong credentials");
      }

  });

  //all products
  app.get('/products', async(req, res)=>{
    try {
      const allProducts = await ProductModel.find({});
      res.json({message: 'Product fetched successfully',data: allProducts});
    } catch (error) {
      console.log("Error fetching",error);
    }
   

  })

//set orders

app.post('/orders',async(req, res)=>{
  const dataFromUser = req.body;
  // const {price, quantity, amount,address,description,mobile} = dataFromUser;
const newOrders = new OrdersModel(dataFromUser);
console.log(dataFromUser);
await newOrders.save();
res.json({message: 'Orders saved successfully',data: newOrders});
})

//get orders 
app.get('/getOrders',async(req, res) => {
  try {
    const data = await OrdersModel.find({});
    res.json({message: 'Success order fetching',data: data});
  } catch (error) {
    res.status(404).send({message: 'Error'}); 
  }

})
app.listen(port,()=>{
    console.log('Server listening on port',port);
});