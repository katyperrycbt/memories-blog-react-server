import express from 'express';
import auth from '../middleware/auth.middleware.js';
import {wall} from '../controllers/wall.controller.js';

const router = express.Router();

router.get('/:id', auth, wall);

export default router;