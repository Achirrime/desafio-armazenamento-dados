const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;