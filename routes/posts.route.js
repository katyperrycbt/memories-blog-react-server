import express from 'express';
import { getPosts, createPosts, updatePost, deletePost, likePost,
     resetAndGetPosts, getComments, postComment, editComment, delComment, starComment } from '../controllers/posts.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', auth, getPosts);
router.post('/', auth, createPosts);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.get('/resetPosts', auth, resetAndGetPosts);
router.get('/comments', auth, getComments);
router.post('/postComment', auth, postComment);
router.patch('/editComment/:cmtId', auth, editComment);
router.patch('/starComment/:cmtId', auth, starComment);
router.delete('/delComment/:cmtId', auth, delComment );


export default router;

