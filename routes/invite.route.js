import express from 'express';
import auth from '../middleware/auth.middleware.js';
import {invite} from '../controllers/invite.controller.js';

const router = express.Router();

router.post('/', auth, invite);

export default router;