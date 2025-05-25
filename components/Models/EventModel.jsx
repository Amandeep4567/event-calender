//EventModal.js
import React, { useState } from 'react';
import { X, Edit3, Trash2, Clock, Calendar, Repeat } from 'lucide-react';
import Button from '../UI/Button';
import EventForm from '../Forms/EventForm';
import ConfirmModal from './ConfirmModel';
import { useEventContext } from '../../context/EventContext';
import { formatDate, formatTime } from '../../utils/dateUtils';

const EventModal = ({ isOpen, onClose, event, selectedDate }) => {
  const [mode, setMode] = useState(event ? 'view' : 'create');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { addEvent, updateEvent, deleteEvent } = useEventContext();

  if (!isOpen) return null;

  const handleSubmit = async (formData) => {
    try {
      if (mode === 'create') {
        const result = await addEvent(formData);
        if (result.success) {
          onClose();
        } else {
          alert(result.error || 'Failed to create event');
        }
      } else if (mode === 'edit') {
        const result = await updateEvent(event.id, formData);
        if (result.success) {
          setMode('view');
        } else {
          alert(result.error || 'Failed to update event');
        }
      }
    } catch (error) {
      console.error('Error submitting event:', error);
      alert('An error occurred while saving the event');
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteEvent(event.id);
      if (result.success) {
        setShowDeleteConfirm(false);
        onClose();
      } else {
        alert(result.error || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('An error occurred while deleting the event');
    }
  };

  const getRecurrenceText = (recurrence) => {
    if (!recurrence || recurrence.type === 'none') return null;
    
    switch (recurrence.type) {
      case 'daily':
        return `Every ${recurrence.interval === 1 ? 'day' : `${recurrence.interval} days`}`;
      case 'weekly':
        return `Every ${recurrence.interval === 1 ? 'week' : `${recurrence.interval} weeks`}`;
      case 'monthly':
        return `Every ${recurrence.interval === 1 ? 'month' : `${recurrence.interval} months`}`;
      case 'custom':
        return `Every ${recurrence.interval} ${recurrence.type}`;
      default:
        return 'Recurring';
    }
  };

  const renderEventView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMode('edit')}
            className="flex items-center space-x-1"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center space-x-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </Button>
        </div>
      </div>

      {event.description && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
          <p className="text-gray-900">{event.description}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-700">Date</p>
              <p className="text-gray-900">{formatDate(new Date(event.startDate), 'MMMM d, yyyy')}</p>
            </div>
          </div>

          {event.startTime && (
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">Time</p>
                <p className="text-gray-900">
                  {event.startTime} {event.endTime && `- ${event.endTime}`}
                </p>
              </div>
            </div>
          )}

          {getRecurrenceText(event.recurrence) && (
            <div className="flex items-center space-x-3">
              <Repeat className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">Recurrence</p>
                <p className="text-gray-900">{getRecurrenceText(event.recurrence)}</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Color</p>
          <div
            className="w-12 h-12 rounded-lg border-2 border-gray-200"
            style={{ backgroundColor: event.color }}
          />
        </div>
      </div>
    </div>
  );

  const renderEventForm = () => (
    <EventForm
      event={mode === 'edit' ? event : null}
      selectedDate={selectedDate}
      onSubmit={handleSubmit}
      onCancel={() => {
        if (mode === 'edit') {
          setMode('view');
        } else {
          onClose();
        }
      }}
    />
  );

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

          <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                {mode === 'create' ? 'Create Event' : mode === 'edit' ? 'Edit Event' : 'Event Details'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {mode === 'view' ? renderEventView() : renderEventForm()}
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
          title="Delete Event"
          message="Are you sure you want to delete this event? This action cannot be undone."
          confirmText="Delete"
          confirmVariant="danger"
        />
      )}
    </>
  );
};

export default EventModal;
