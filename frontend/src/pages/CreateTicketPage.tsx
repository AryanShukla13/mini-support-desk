import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { ticketApi } from '../api/client';
import type { CreateTicketInput, TicketPriority } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { TextArea } from '../components/ui/TextArea';
import { Select } from '../components/ui/Select';

export const CreateTicketPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<CreateTicketInput>({
    title: '',
    description: '',
    priority: 'MEDIUM',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useMutation({
    mutationFn: (data: CreateTicketInput) => ticketApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      navigate(`/tickets/${response.data.id}`);
    },
    onError: (error: any) => {
      if (error.response?.data?.details) {
        const newErrors: Record<string, string> = {};
        error.response.data.details.forEach((detail: any) => {
          newErrors[detail.field] = detail.message;
        });
        setErrors(newErrors);
      }
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    } else if (formData.title.length > 80) {
      newErrors.title = 'Title must be at most 80 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    } else if (formData.description.length > 2000) {
      newErrors.description = 'Description must be at most 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Tickets</span>
      </button>

      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Ticket</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
            placeholder="Enter a descriptive title (5-80 characters)"
            maxLength={80}
            required
          />

          <div>
            <TextArea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              error={errors.description}
              placeholder="Describe the issue in detail (20-2000 characters)"
              rows={8}
              maxLength={2000}
              required
            />
            <div className="mt-1 text-sm text-gray-500 text-right">
              {formData.description.length}/2000 characters
            </div>
          </div>

          <Select
            label="Priority"
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value as TicketPriority })
            }
            options={[
              { value: 'LOW', label: 'Low' },
              { value: 'MEDIUM', label: 'Medium' },
              { value: 'HIGH', label: 'High' },
            ]}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              isLoading={createMutation.isPending}
              className="flex-1"
            >
              Create Ticket
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/')}
              disabled={createMutation.isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
