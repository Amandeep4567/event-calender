//CalendarHeader.js
import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import Button from '../UI/Button';
import { useEventContext } from '../../context/EventContext';

const CalendarHeader = () => {
  const {
    getMonthYear,
    navigateToPrevMonth,
    navigateToNextMonth,
    navigateToToday
  } = useEventContext();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-900">{getMonthYear()}</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={navigateToToday}
          className="flex items-center space-x-1"
        >
          <CalendarIcon className="w-4 h-4" />
          <span>Today</span>
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={navigateToPrevMonth}
          className="p-2"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={navigateToNextMonth}
          className="p-2"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
