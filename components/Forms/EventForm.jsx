import React, { useState, useEffect } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Select from '../UI/Select';
import DatePicker from '../UI/DatePicker';
import TimePickerForm from './TimePickerForm';
import RecurrenceForm from './RecurrenceForm';
import { EVENT_COLORS, RECURRENCE_TYPES } from '../../utils/constants';
import { formatDate } from '../../utils/dateUtils';

const EventForm = ({ event, onSubmit, onCancel, selectedDate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: selectedDate ? formatDate(selectedDate) : formatDate(new Date()),
    endDate: selectedDate ? formatDate(selectedDate) : formatDate(new Date()),
    startTime: '09:00',
    endTime: '10:00',
    color: EVENT_COLORS[0],
    recurrence: {
      type: RECURRENCE_TYPES.NONE,
      interval: 1,
      selectedDays: [],
      endDate: null
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        startDate: event.startDate || formatDate(new Date()),
        endDate: event.endDate || event.startDate || formatDate(new Date()),
        startTime: event.startTime || '09:00',
        endTime: event.endTime || '10:00',
        color: event.color || EVENT_COLORS[0],
        recurrence: event.recurrence || {
          type: RECURRENCE_TYPES.NONE,
          interval: 1,
          selectedDays: [],
          endDate: null
        }
      });
    }
  }, [event]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.startTime && formData.endTime) {
      const startDateTime = new Date(`${formData.startDate} ${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate} ${formData.endTime}`);

      if (endDateTime <= startDateTime) {
        newErrors.endTime = 'End time must be after start time';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleRecurrenceChange = (recurrenceData) => {
    setFormData(prev => ({
      ...prev,
      recurrence: recurrenceData
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Title *
          </label>
          <Input
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter event title"
            error={!!errors.title}
            required
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter event description"
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <DatePicker
              value={formData.startDate}
              onChange={(value) => {
                handleInputChange('startDate', value);
                if (formData.endDate < value) {
                  handleInputChange('endDate', value);
                }
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <DatePicker
              value={formData.endDate}
              onChange={(value) => handleInputChange('endDate', value)}
              min={formData.startDate}
            />
          </div>
        </div>

        <TimePickerForm
          startTime={formData.startTime}
          endTime={formData.endTime}
          onStartTimeChange={(value) => handleInputChange('startTime', value)}
          onEndTimeChange={(value) => handleInputChange('endTime', value)}
          error={errors.endTime}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Color
          </label>
          <div className="flex space-x-2">
            {EVENT_COLORS.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => handleInputChange('color', color)}
                className={`w-8 h-8 rounded-full border-2 ${formData.color === color ? 'border-gray-800' : 'border-gray-300'
                  }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <RecurrenceForm
          recurrence={formData.recurrence}
          onChange={handleRecurrenceChange}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit">
          {event ? 'Update Event' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
