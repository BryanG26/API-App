require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

export const PORT = process.env.PORT || 3000;

export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'root'
export const DB_NAME = process.env.DB_NAME || 'app_tiempos'
export const DB_PORT = process.env.DB_PORT || '3306'


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
