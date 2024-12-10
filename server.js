// src/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./route/userRoute'); // Mengimpor rute pengguna

const app = express();
const port = 4000;

// Middleware
app.use(cors()); // Mengizinkan permintaan dari domain lain
app.use(bodyParser.json()); // Untuk memparsing JSON body

// Menggunakan rute untuk user
app.use('/api', userRoutes); // Semua rute user akan diawali dengan /api

// Rute default
app.get('/', (req, res) => {
  res.send('Hello, welcome to the Express API!');
});

// Menangani error jika tidak ada rute yang ditemukan
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
