import express from 'express';
import auth from '../middleware/auth.middleware.js';
import {wall, toggleFollow} from '../controllers/wall.controller.js';

const router = express.Router();

router.get('/:id', auth, wall);
router.get('/toggleFollow/:id', auth, toggleFollow);

export default router;