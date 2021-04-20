import express from 'express';
import { signin, signup, getInfo, updateInfo, getAVTs, toggleSubcribe } from '../controllers/user.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/getInfo', auth, getInfo);
router.patch('/updateInfo', auth, updateInfo);
router.get('/getAVTs', auth, getAVTs)
router.post('/toggleSubcribe', auth, toggleSubcribe);
export default router;