const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { check, validationResult } = require("express-validator");
const normalize = require('normalize-url');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user (with OTP email verification)
// @access   Public
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      user = new User({
        name,
        email,
        avatar,
        password,
        isVerified: false,
        emailVerificationCode: otp,
        emailVerificationCodeExpires: Date.now() + 10 * 60 * 1000 // 10 min
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Send OTP email
      const transporter = nodemailer.createTransport({
        service: 'Gmail', // or your SMTP provider
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      await transporter.sendMail({
        to: user.email,
        subject: 'Your verification code',
        text: `Your verification code is: ${otp}`
      });

      res.json({ msg: 'Registration successful. Check your email for the verification code.' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.post('/verify-email', async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });

  if (
    !user ||
    user.isVerified ||
    user.emailVerificationCode !== code ||
    user.emailVerificationCodeExpires < Date.now()
  ) {
    return res.status(400).json({ msg: 'Invalid or expired verification code' });
  }

  user.isVerified = true;
  user.emailVerificationCode = undefined;
  user.emailVerificationCodeExpires = undefined;
  await user.save();

  res.json({ msg: 'Email verified successfully!' });
});


module.exports = router;