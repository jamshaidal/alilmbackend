const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ msg: 'Missing fields' });

    // Basic example emailer; configure with your env
    // Explicit SMTP configuration with SSL to avoid timeouts
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Increase connection timeout for cloud environment latency
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Contact form: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ msg: 'Failed to send message' });
  }
});

module.exports = router;
