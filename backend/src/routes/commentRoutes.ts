import { Router } from 'express';
import { CommentController } from '../controllers/commentController';

const router = Router();
const commentController = new CommentController();

router.post('/:id/comments', commentController.createComment);
router.get('/:id/comments', commentController.getComments);

export default router;
