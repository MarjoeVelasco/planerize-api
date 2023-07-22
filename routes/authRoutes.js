import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();
//POST /v1/auth/register
router.post('/register', registerUser);
//POST /v1/auth/login
router.post('/login', loginUser);

router.get('/api/example', (req, res) => {
  res.status(200).json({ message: 'Example route' });
});


// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default router;