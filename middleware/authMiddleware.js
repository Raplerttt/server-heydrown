// src/middleware/authMiddleware.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware untuk cek autentikasi
const authenticate = async (req, res, next) => {
  const { username, password } = req.query;  // Bisa diganti sesuai dengan mekanisme autentikasi lain (seperti token)

  // Validasi autentikasi sederhana
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user || user.password !== password) { // Pastikan password di-hash saat autentikasi sebenarnya
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = user;  // Menyimpan informasi user di request untuk digunakan di route berikutnya
  next();  // Melanjutkan ke middleware atau route berikutnya
};

module.exports = { authenticate };
