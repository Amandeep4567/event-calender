//RecurrenceForm.js
import React from 'react';
import Select from '../UI/Select';
import Input from '../UI/Input';
import DatePicker from '../UI/DatePicker';
import { RECURRENCE_TYPES, DAYS_OF_WEEK } from '../../utils/constants';
import { formatDate } from '../../utils/dateUtils';

const RecurrenceForm = ({ recurrence, onChange }) => {
  const recurrenceOptions = [
    { value: RECURRENCE_TYPES.NONE, label: 'No Repeat' },
    { value: RECURRENCE_TYPES.DAILY, label: 'Daily' },
    { value: RECURRENCE_TYPES.WEEKLY, label: 'Weekly' },
    { value: RECURRENCE_TYPES.MONTHLY, label: 'Monthly' },
    { value: RECURRENCE_TYPES.CUSTOM, label: 'Custom' }
  ];

  const handleRecurrenceTypeChange = (type) => {
    onChange({
      ...recurrence,
      type,
      interval: 1,
      selectedDays: [],
      endDate: null
    });
  };

  const handleIntervalChange = (interval) => {
    onChange({
      ...recurrence,
      interval: parseInt(interval) || 1
    });
  };

  const handleDayToggle = (dayIndex) => {
    const selectedDays = recurrence.selectedDays || [];
    const newSelectedDays = selectedDays.includes(dayIndex)
      ? selectedDays.filter(d => d !== dayIndex)
      : [...selectedDays, dayIndex];

    onChange({
      ...recurrence,
      selectedDays: newSelectedDays
    });
  };

  const handleEndDateChange = (endDate) => {
    onChange({
      ...recurrence,
      endDate
    });
  };

  const getIntervalLabel = () => {
    switch (recurrence.type) {
      case RECURRENCE_TYPES.DAILY:
        return 'day(s)';
      case RECURRENCE_TYPES.WEEKLY:
        return 'week(s)';
      case RECURRENCE_TYPES.MONTHLY:
        return 'month(s)';
      default:
        return 'interval';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Repeat
        </label>
        <Select
          value={recurrence.type}
          onChange={handleRecurrenceTypeChange}
          options={recurrenceOptions}
        />
      </div>

      {recurrence.type !== RECURRENCE_TYPES.NONE && (
        <>
          {(recurrence.type === RECURRENCE_TYPES.CUSTOM ||
            recurrence.type === RECURRENCE_TYPES.DAILY ||
            recurrence.type === RECURRENCE_TYPES.WEEKLY ||
            recurrence.type === RECURRENCE_TYPES.MONTHLY) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Repeat every
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min="1"
                    max="365"
                    value={recurrence.interval}
                    onChange={(e) => handleIntervalChange(e.target.value)}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600">{getIntervalLabel()}</span>
                </div>
              </div>
            )}

          {recurrence.type === RECURRENCE_TYPES.WEEKLY && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repeat on
              </label>
              <div className="flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map((day, index) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(index)}
                    className={`px-3 py-1 text-sm rounded-md border transition-colors ${(recurrence.selectedDays || []).includes(index)
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {day.substr(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End repeat (optional)
            </label>
            <DatePicker
              value={recurrence.endDate || ''}
              onChange={handleEndDateChange}
              min={formatDate(new Date())}
              placeholder="Select end date"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RecurrenceForm;
