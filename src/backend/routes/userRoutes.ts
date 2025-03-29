import { Router } from 'express';
import { getUsers, blockUsers, unblockUsers, deleteUsers } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.post('/block', blockUsers);
router.post('/unblock', unblockUsers);
router.post('/delete', deleteUsers);

export default router;
