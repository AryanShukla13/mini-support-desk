import { z } from 'zod';

export const TicketStatus = z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED']);
export const TicketPriority = z.enum(['LOW', 'MEDIUM', 'HIGH']);

export const createTicketSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(80, 'Title must be at most 80 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000, 'Description must be at most 2000 characters'),
  priority: TicketPriority.default('MEDIUM'),
});

export const updateTicketSchema = z.object({
  title: z.string().min(5).max(80).optional(),
  description: z.string().min(20).max(2000).optional(),
  status: TicketStatus.optional(),
  priority: TicketPriority.optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});

export const createCommentSchema = z.object({
  authorName: z.string().min(1, 'Author name is required').max(100, 'Author name must be at most 100 characters'),
  message: z.string().min(1, 'Message is required').max(500, 'Message must be at most 500 characters'),
});

export const queryTicketsSchema = z.object({
  q: z.string().optional(),
  status: TicketStatus.optional(),
  priority: TicketPriority.optional(),
  sort: z.enum(['newest', 'oldest']).optional().default('newest'),
  page: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().positive()).optional().default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().positive().max(100)).optional().default('10'),
});

export const queryCommentsSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().positive()).optional().default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().positive().max(50)).optional().default('20'),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type UpdateTicketInput = z.infer<typeof updateTicketSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type QueryTicketsInput = z.infer<typeof queryTicketsSchema>;
export type QueryCommentsInput = z.infer<typeof queryCommentsSchema>;
