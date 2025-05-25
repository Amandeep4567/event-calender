import React from 'react';
import CalendarDay from './CalendarDay';
import { useEventContext } from '../../context/EventContext';
import { DAYS_OF_WEEK } from '../../utils/constants';

const CalendarGrid = () => {
  const { monthDays } = useEventContext();

  return (
    <div className="bg-white rounded-lg">
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-t-lg">
        {DAYS_OF_WEEK.map(day => (
          <div
            key={day}
            className="bg-gray-50 py-2 px-3 text-center text-sm font-medium text-gray-500"
          >
            {day.substr(0, 3)}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-b-lg">
        {monthDays.map((day, index) => (
          <CalendarDay key={index} date={day} />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
