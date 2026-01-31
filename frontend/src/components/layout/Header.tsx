import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TicketIcon, Plus } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary-600">
            <TicketIcon size={28} />
            <span>Support Desk</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tickets
            </Link>
            <Link
              to="/create"
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus size={18} />
              <span>New Ticket</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
