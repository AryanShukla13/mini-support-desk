export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  _count?: {
    comments: number;
  };
  comments?: Comment[];
}

export interface Comment {
  id: string;
  ticketId: string;
  authorName: string;
  message: string;
  createdAt: string;
}

export interface CreateTicketInput {
  title: string;
  description: string;
  priority: TicketPriority;
}

export interface UpdateTicketInput {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
}

export interface CreateCommentInput {
  authorName: string;
  message: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: Pagination;
}

export interface ApiError {
  success: false;
  error: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}
