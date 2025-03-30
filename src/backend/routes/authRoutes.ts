import { Router } from 'express';
import { register, login } from '../controllers/authController.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Auth API working!' });
  });
  
router.post('/register', register);
router.post('/login', login);

export default router;
