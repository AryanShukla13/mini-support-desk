import { create } from 'zustand';
import type { TicketStatus, TicketPriority } from '../types';

interface FilterState {
  search: string;
  status: TicketStatus | '';
  priority: TicketPriority | '';
  sort: 'newest' | 'oldest';
  setSearch: (search: string) => void;
  setStatus: (status: TicketStatus | '') => void;
  setPriority: (priority: TicketPriority | '') => void;
  setSort: (sort: 'newest' | 'oldest') => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  search: '',
  status: '',
  priority: '',
  sort: 'newest',
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setSort: (sort) => set({ sort }),
  reset: () => set({ search: '', status: '', priority: '', sort: 'newest' }),
}));
