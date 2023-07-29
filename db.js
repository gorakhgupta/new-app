const mongoose = require('mongoose');

const url = 'mongodb+srv://gorakh11:amazon@cluster1.q0dzyre.mongodb.net/'; // Replace with your MongoDB connection string
const dbName = 'Amazon-clone'; // Replace with your database name

async function connectToDatabase() {
  try {
    const client = await mongoose.connect(url, { useUnifiedTopology: true });
    const db = client.connection.db;
    console.log('Connected to MongoDB');
    return db;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

module.exports = { connectToDatabase };
