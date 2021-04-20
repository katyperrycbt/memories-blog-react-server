import express from 'express';
import { createNoti, deleteNoti, getNoti } from '../controllers/noti.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/createNoti', auth, createNoti);
router.delete('/deleteNoti/:id', auth, deleteNoti);
router.get('/', getNoti);

export default router;