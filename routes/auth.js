const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST /api/auth/login - Admin login only
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('[AUTH] Incoming login payload:', { email, passwordLength: password ? password.length : 0 });
  try {
    console.log('[AUTH] Login attempt for email:', email);
    
    // Only allow the configured admin email to log in
    const allowedAdminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
    if (!allowedAdminEmail) {
      console.error('[AUTH] Admin email not configured on server');
      return res.status(500).json({ msg: 'Admin email not configured on server' });
    }

    if (!email || !password) {
      console.warn('[AUTH] Missing email or password', { email, password });
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    if (email.toLowerCase() !== allowedAdminEmail) {
      console.warn('[AUTH] Email not allowed', { provided: email.toLowerCase(), allowed: allowedAdminEmail });
      return res.status(400).json({ msg: 'Invalid credentials', reason: 'Email does not match allowed admin email' });
    }

    const user = await User.findOne({ email: allowedAdminEmail });
    if (!user) {
      console.warn('[AUTH] Admin user not found in DB for', allowedAdminEmail);
      return res.status(400).json({ msg: 'Invalid credentials', reason: 'Admin user not found in DB' });
    }

    if (user.role !== 'admin') {
      console.warn('[AUTH] User role is not admin:', user.role);
      return res.status(403).json({ msg: 'Access denied', reason: 'User role is not admin' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn('[AUTH] Password mismatch for', allowedAdminEmail, { attemptedPasswordLength: password.length });
      return res.status(400).json({ msg: 'Invalid credentials', reason: 'Password mismatch' });
    }

    console.log('[AUTH] Login successful for', allowedAdminEmail);
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });
  } catch (err) {
    console.error('[AUTH] Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
