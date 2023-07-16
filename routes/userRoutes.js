import express from 'express';
import User from '../models/user.js';

const router = express.Router();


// GET /users
router.get('/', async (req, res) => {
  res.send('GET /users');
});

// POST /users
router.post('/', async (req, res) => {
  res.send('POST /users');
});

// GET /users/:id
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  res.send(`GET /users/${userId}`);
});

// PUT /users/:id
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  res.send(`PUT /users/${userId}`);
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  res.send(`DELETE /users/${userId}`);
});

export default router;