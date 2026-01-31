import React from 'react';
import { Search, X } from 'lucide-react';
import { useFilterStore } from '../../store/filterStore';
import { Select } from '../ui/Select';

export const TicketFilters: React.FC = () => {
  const { search, status, priority, sort, setSearch, setStatus, setPriority, setSort, reset } =
    useFilterStore();

  const hasActiveFilters = search || status || priority || sort !== 'newest';

  return (
    <div className="card">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'OPEN', label: 'Open' },
              { value: 'IN_PROGRESS', label: 'In Progress' },
              { value: 'RESOLVED', label: 'Resolved' },
            ]}
            className="w-40"
          />

          {/* Priority Filter */}
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            options={[
              { value: '', label: 'All Priorities' },
              { value: 'LOW', label: 'Low' },
              { value: 'MEDIUM', label: 'Medium' },
              { value: 'HIGH', label: 'High' },
            ]}
            className="w-40"
          />

          {/* Sort */}
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            options={[
              { value: 'newest', label: 'Newest First' },
              { value: 'oldest', label: 'Oldest First' },
            ]}
            className="w-40"
          />

          {/* Reset */}
          {hasActiveFilters && (
            <button
              onClick={reset}
              className="btn btn-secondary flex items-center gap-2"
              aria-label="Reset filters"
            >
              <X size={18} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
