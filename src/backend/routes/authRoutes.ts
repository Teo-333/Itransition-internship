import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();
// routes/authRoutes.ts
router.get('/', (req, res) => {
    res.json({ message: 'Auth API working!' });
  });
  
router.post('/register', register);
router.post('/login', login);

export default router;
