import express from 'express';
import {checkEmail} from '../controllers/invite.controller.js';

const router = express.Router();

router.get('/find/:email', checkEmail);

export default router;