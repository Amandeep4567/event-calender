import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import { useEventContext } from '../../context/EventContext';

const Calendar = () => {
  const { isLoading } = useEventContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <CalendarHeader />
      <CalendarGrid />
    </div>
  );
};

export default Calendar;
