const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST /api/teacher-inquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ msg: 'Missing fields' });

    // Explicit SMTP configuration with SSL to avoid timeouts
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Increase connection timeout
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Teacher inquiry: ${subject || '(no subject)'} - ${name}`,
      text: `From: ${name} <${email}>\nPhone: ${phone || '-'}\n\n${message}`,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('Teacher inquiry error detailed:', {
      message: err.message,
      code: err.code,
      response: err.response,
      stack: err.stack
    });
    res.status(500).json({
      msg: 'Failed to send request',
      error: err.message,
      code: err.code
    });
  }
});

module.exports = router;
