// import axios from 'axios';
// import type {
//   Ticket,
//   Comment,
//   CreateTicketInput,
//   UpdateTicketInput,
//   CreateCommentInput,
//   ApiResponse,
// } from '../types';

// const api = axios.create({
//   baseURL: '/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const ticketApi = {
//   getAll: async (params?: {
//     q?: string;
//     status?: string;
//     priority?: string;
//     sort?: string;
//     page?: number;
//     limit?: number;
//   }) => {
//     const { data } = await api.get<ApiResponse<Ticket[]>>('/tickets', { params });
//     return data;
//   },

//   getById: async (id: string) => {
//     const { data } = await api.get<ApiResponse<Ticket>>(`/tickets/${id}`);
//     return data;
//   },

//   create: async (input: CreateTicketInput) => {
//     const { data } = await api.post<ApiResponse<Ticket>>('/tickets', input);
//     return data;
//   },

//   update: async (id: string, input: UpdateTicketInput) => {
//     const { data } = await api.patch<ApiResponse<Ticket>>(`/tickets/${id}`, input);
//     return data;
//   },

//   delete: async (id: string) => {
//     await api.delete(`/tickets/${id}`);
//   },
// };

// export const commentApi = {
//   getByTicketId: async (ticketId: string, params?: { page?: number; limit?: number }) => {
//     const { data } = await api.get<ApiResponse<Comment[]>>(`/tickets/${ticketId}/comments`, {
//       params,
//     });
//     return data;
//   },

//   create: async (ticketId: string, input: CreateCommentInput) => {
//     const { data } = await api.post<ApiResponse<Comment>>(
//       `/tickets/${ticketId}/comments`,
//       input
//     );
//     return data;
//   },
// };

// export default api;


import axios from 'axios';
import type {
  Ticket,
  Comment,
  CreateTicketInput,
  UpdateTicketInput,
  CreateCommentInput,
  ApiResponse,
} from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ticketApi = {
  getAll: async (params?: {
    q?: string;
    status?: string;
    priority?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) => {
    const { data } = await api.get<ApiResponse<Ticket[]>>('/tickets', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<ApiResponse<Ticket>>(`/tickets/${id}`);
    return data;
  },

  create: async (input: CreateTicketInput) => {
    const { data } = await api.post<ApiResponse<Ticket>>('/tickets', input);
    return data;
  },

  update: async (id: string, input: UpdateTicketInput) => {
    const { data } = await api.patch<ApiResponse<Ticket>>(`/tickets/${id}`, input);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/tickets/${id}`);
  },
};

export const commentApi = {
  getByTicketId: async (ticketId: string, params?: { page?: number; limit?: number }) => {
    const { data } = await api.get<ApiResponse<Comment[]>>(`/tickets/${ticketId}/comments`, {
      params,
    });
    return data;
  },

  create: async (ticketId: string, input: CreateCommentInput) => {
    const { data } = await api.post<ApiResponse<Comment>>(
      `/tickets/${ticketId}/comments`,
      input
    );
    return data;
  },
};

export default api;