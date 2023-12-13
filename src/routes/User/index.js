import { Router } from 'express';
import { home, getMe, updateMe } from './../../controllers/user.js';

const router = Router();

router.get('/', home);

router.get('/me', getMe);

router.put('/me', updateMe);

export default router;
