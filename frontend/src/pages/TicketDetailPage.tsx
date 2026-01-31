import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Trash2, Clock } from 'lucide-react';
import { ticketApi, commentApi } from '../api/client';
import type { TicketStatus, CreateCommentInput } from '../types';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { TextArea } from '../components/ui/TextArea';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { CommentItem } from '../components/tickets/CommentItem';
import {
  formatDate,
  getStatusColor,
  getPriorityColor,
  formatStatusLabel,
} from '../utils/helpers';

export const TicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [commentForm, setCommentForm] = useState<CreateCommentInput>({
    authorName: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['ticket', id],
    queryFn: () => ticketApi.getById(id!),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (status: TicketStatus) => ticketApi.update(id!, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket', id] });
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => ticketApi.delete(id!),
    onSuccess: () => {
      navigate('/');
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: (input: CreateCommentInput) => commentApi.create(id!, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket', id] });
      setCommentForm({ authorName: '', message: '' });
      setErrors({});
    },
  });

  const handleStatusChange = (newStatus: string) => {
    updateMutation.mutate(newStatus as TicketStatus);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      deleteMutation.mutate();
    }
  };

  const validateComment = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!commentForm.authorName.trim()) {
      newErrors.authorName = 'Author name is required';
    } else if (commentForm.authorName.length > 100) {
      newErrors.authorName = 'Author name must be at most 100 characters';
    }

    if (!commentForm.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (commentForm.message.length > 500) {
      newErrors.message = 'Message must be at most 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateComment()) {
      addCommentMutation.mutate(commentForm);
    }
  };

  if (isLoading) {
    return <Loading text="Loading ticket details..." />;
  }

  if (error || !data?.data) {
    return (
      <ErrorMessage
        message="Failed to load ticket. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const ticket = data.data;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Tickets</span>
      </button>

      {/* Ticket Header */}
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{ticket.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={getStatusColor(ticket.status)}>
                {formatStatusLabel(ticket.status)}
              </Badge>
              <Badge className={getPriorityColor(ticket.priority)}>
                {ticket.priority} Priority
              </Badge>
            </div>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            isLoading={deleteMutation.isPending}
            className="flex items-center gap-2"
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>Created {formatDate(ticket.createdAt)}</span>
          </div>
          {ticket.updatedAt !== ticket.createdAt && (
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>Updated {formatDate(ticket.updatedAt)}</span>
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Description</h2>
          <p className="text-gray-900 whitespace-pre-wrap">{ticket.description}</p>
        </div>

        <div className="border-t pt-4 mt-4">
          <Select
            label="Change Status"
            value={ticket.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            options={[
              { value: 'OPEN', label: 'Open' },
              { value: 'IN_PROGRESS', label: 'In Progress' },
              { value: 'RESOLVED', label: 'Resolved' },
            ]}
            className="max-w-xs"
          />
          {updateMutation.isPending && (
            <p className="text-sm text-gray-600 mt-2">Updating status...</p>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">
          Comments ({ticket.comments?.length || 0})
        </h2>

        {ticket.comments && ticket.comments.length > 0 ? (
          <div className="space-y-3 mb-6">
            {ticket.comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8 mb-6">
            No comments yet. Be the first to comment!
          </p>
        )}

        {/* Add Comment Form */}
        <form onSubmit={handleAddComment} className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Add a Comment</h3>
          <div className="space-y-4">
            <Input
              label="Your Name"
              value={commentForm.authorName}
              onChange={(e) =>
                setCommentForm({ ...commentForm, authorName: e.target.value })
              }
              error={errors.authorName}
              placeholder="Enter your name"
              maxLength={100}
            />
            <TextArea
              label="Message"
              value={commentForm.message}
              onChange={(e) =>
                setCommentForm({ ...commentForm, message: e.target.value })
              }
              error={errors.message}
              placeholder="Write your comment..."
              rows={4}
              maxLength={500}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {commentForm.message.length}/500 characters
              </span>
              <Button
                type="submit"
                isLoading={addCommentMutation.isPending}
              >
                Post Comment
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};