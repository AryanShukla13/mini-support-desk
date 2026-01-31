import React from 'react';
import { User } from 'lucide-react';
import type { Comment } from '../../types';
import { formatDate } from '../../utils/helpers';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
          <User size={20} className="text-primary-600" />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-900">{comment.authorName}</span>
          <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
        </div>
        <p className="text-gray-700">{comment.message}</p>
      </div>
    </div>
  );
};
