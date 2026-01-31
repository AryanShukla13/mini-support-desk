import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ticketApi } from '../api/client';
import { useFilterStore } from '../store/filterStore';
import { TicketCard } from '../components/tickets/TicketCard';
import { TicketFilters } from '../components/tickets/TicketFilters';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const TicketListPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { search, status, priority, sort } = useFilterStore();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['tickets', search, status, priority, sort, page],
    queryFn: () =>
      ticketApi.getAll({
        q: search || undefined,
        status: status || undefined,
        priority: priority || undefined,
        sort,
        page,
        limit: 10,
      }),
  });

  if (isLoading) {
    return <Loading text="Loading tickets..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load tickets. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const tickets = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <TicketFilters />

      {tickets.length === 0 ? (
        <EmptyState
          title="No tickets found"
          description={
            search || status || priority
              ? 'Try adjusting your filters to see more results.'
              : 'Get started by creating your first support ticket.'
          }
          action={
            <Button onClick={() => navigate('/create')}>
              Create First Ticket
            </Button>
          }
        />
      ) : (
        <>
          <div className="grid gap-4">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between card">
              <div className="text-sm text-gray-600">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                {pagination.total} tickets
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter(
                      (p) =>
                        p === 1 ||
                        p === pagination.totalPages ||
                        Math.abs(p - page) <= 1
                    )
                    .map((p, i, arr) => (
                      <React.Fragment key={p}>
                        {i > 0 && arr[i - 1] !== p - 1 && (
                          <span className="text-gray-400">...</span>
                        )}
                        <button
                          onClick={() => setPage(p)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            p === page
                              ? 'bg-primary-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                          }`}
                        >
                          {p}
                        </button>
                      </React.Fragment>
                    ))}
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
