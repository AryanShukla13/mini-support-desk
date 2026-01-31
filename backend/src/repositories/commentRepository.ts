import prisma from '../db/prisma';
import { CreateCommentInput, QueryCommentsInput } from '../validators/schemas';

export class CommentRepository {
  async create(ticketId: string, data: CreateCommentInput) {
    return prisma.comment.create({
      data: {
        ...data,
        ticketId,
      },
    });
  }

  async findByTicketId(ticketId: string, query: QueryCommentsInput) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: { ticketId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.comment.count({ where: { ticketId } }),
    ]);

    return {
      comments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
