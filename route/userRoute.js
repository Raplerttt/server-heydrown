// src/routes/userRoute.js

const express = require('express');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser, loginUser } = require('../controller/userController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Rute untuk mendapatkan semua user (public)
router.get('/users', getAllUsers);

// Rute untuk mendapatkan user berdasarkan ID (public)
router.get('/users/:id', getUserById);

// Rute untuk membuat user baru (public)
router.post('/users', createUser);

// Rute untuk login (public)
router.post('/login', loginUser);

// Rute untuk mengupdate user (auth required)
router.put('/users/:id', authenticate, updateUser);

// Rute untuk menghapus user (auth required)
router.delete('/users/:id', authenticate, deleteUser);

module.exports = router;
