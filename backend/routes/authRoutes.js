// Import required modules
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { getUserByEmail, createUser } from '../services/userService.js';

const router = express.Router();

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// Authenticate a JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access Denied' });

  try {
      const verified = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
      req.user = verified; // Add user info to request
      next();
  } catch (err) {
      res.status(400).json({ error: 'Invalid Token' });
  }
};

// User Registration Route
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('username').notEmpty().withMessage('Username is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
      // Check if the user already exists
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already in use' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const newUser = await createUser({ username, email, password: hashedPassword });

      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// User Login Route
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log(`Attempting to Log In: ${email}`);
    try {
      // Retrieve user from database
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
      console.log(`Logging In: ${email}`);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;
