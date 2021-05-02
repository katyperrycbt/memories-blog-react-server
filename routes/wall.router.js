import express from 'express';
import auth from '../middleware/auth.middleware.js';
import {wall, toggleFollow, see} from '../controllers/wall.controller.js';

const router = express.Router();

router.get('/:id', auth, wall);
router.get('/toggleFollow/:id', auth, toggleFollow);
router.get('/see/:id', see);

export default router;