import { CommentRepository } from '../repositories/commentRepository';
import { TicketRepository } from '../repositories/ticketRepository';
import { CreateCommentInput, QueryCommentsInput } from '../validators/schemas';

export class CommentService {
  private commentRepo: CommentRepository;
  private ticketRepo: TicketRepository;

  constructor() {
    this.commentRepo = new CommentRepository();
    this.ticketRepo = new TicketRepository();
  }

  async createComment(ticketId: string, data: CreateCommentInput) {
    const ticketExists = await this.ticketRepo.exists(ticketId);
    if (!ticketExists) {
      throw new Error('Ticket not found');
    }
    return this.commentRepo.create(ticketId, data);
  }

  async getCommentsByTicketId(ticketId: string, query: QueryCommentsInput) {
    const ticketExists = await this.ticketRepo.exists(ticketId);
    if (!ticketExists) {
      throw new Error('Ticket not found');
    }
    return this.commentRepo.findByTicketId(ticketId, query);
  }
}
