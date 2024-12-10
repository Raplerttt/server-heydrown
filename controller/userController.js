// src/controllers/userController.js

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE: Membuat user baru
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Hash password sebelum menyimpan ke database
  const hashedPassword = await bcrypt.hash(password, 10);  // 10 adalah jumlah salt rounds

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,  // Menyimpan password yang telah di-hash
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ: Mendapatkan semua user
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ: Mendapatkan user berdasarkan ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE: Mengupdate data user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  // Jika password baru diberikan, hash password-nya
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        username,
        email,
        password: hashedPassword || undefined,  // Hanya update password jika ada
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE: Menghapus user berdasarkan ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN: Verifikasi user dan password
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verifikasi password dengan bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};
