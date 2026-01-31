import { Request, Response, NextFunction } from 'express';
import { CommentService } from '../services/commentService';
import { createCommentSchema, queryCommentsSchema } from '../validators/schemas';

export class CommentController {
  private commentService: CommentService;

  constructor() {
    this.commentService = new CommentService();
  }

  createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const validatedData = createCommentSchema.parse(req.body);
      const comment = await this.commentService.createComment(id, validatedData);
      res.status(201).json({
        success: true,
        data: comment,
      });
    } catch (error) {
      next(error);
    }
  };

  getComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const validatedQuery = queryCommentsSchema.parse(req.query);
      const result = await this.commentService.getCommentsByTicketId(id, validatedQuery);
      res.json({
        success: true,
        data: result.comments,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  };
}
