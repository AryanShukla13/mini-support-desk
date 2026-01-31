import prisma from '../db/prisma';
import { CreateTicketInput, UpdateTicketInput, QueryTicketsInput } from '../validators/schemas';
import { Prisma } from '@prisma/client';

export class TicketRepository {
  async create(data: CreateTicketInput) {
    return prisma.ticket.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.ticket.findUnique({
      where: { id },
      include: {
        comments: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });
  }

  async findAll(query: QueryTicketsInput) {
    const { q, status, priority, sort, page, limit } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.TicketWhereInput = {
      ...(status && { status }),
      ...(priority && { priority }),
      ...(q && {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
        ],
      }),
    };

    const [tickets, total] = await Promise.all([
      prisma.ticket.findMany({
        where,
        orderBy: { createdAt: sort === 'newest' ? 'desc' : 'asc' },
        skip,
        take: limit,
        include: {
          _count: {
            select: { comments: true },
          },
        },
      }),
      prisma.ticket.count({ where }),
    ]);

    return {
      tickets,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async update(id: string, data: UpdateTicketInput) {
    return prisma.ticket.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.ticket.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await prisma.ticket.count({
      where: { id },
    });
    return count > 0;
  }
}
