import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Clock } from 'lucide-react';
import type { Ticket } from '../../types';
import {
  formatDate,
  getStatusColor,
  getPriorityColor,
  formatStatusLabel,
} from '../../utils/helpers';
import { Badge } from '../ui/Badge';

interface TicketCardProps {
  ticket: Ticket;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const commentCount = ticket._count?.comments || 0;

  return (
    <Link
      to={`/tickets/${ticket.id}`}
      className="card hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-1">
          {ticket.title}
        </h3>
        <div className="flex gap-2 ml-4 flex-shrink-0">
          <Badge className={getStatusColor(ticket.status)}>
            {formatStatusLabel(ticket.status)}
          </Badge>
          <Badge className={getPriorityColor(ticket.priority)}>
            {ticket.priority}
          </Badge>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{ticket.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{formatDate(ticket.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare size={16} />
          <span>{commentCount} comment{commentCount !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </Link>
  );
};
