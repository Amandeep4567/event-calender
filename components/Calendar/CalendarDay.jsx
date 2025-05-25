import React, { useState } from 'react';
import EventCard from './EventCard';
import EventModal from '../Models/EventModel';
import { useEventContext } from '../../context/EventContext';
import { isSameMonthUtil, isTodayUtil } from '../../utils/dateUtils';

const CalendarDay = ({ date }) => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const {
    currentDate,
    getEventsForDate,
    selectDate,
    selectedDate,
    dragOverDate,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    canDropOnDate
  } = useEventContext();

  const dayEvents = getEventsForDate(date);
  const isCurrentMonth = isSameMonthUtil(date, currentDate);
  const isToday = isTodayUtil(date);
  const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
  const isDragOver = dragOverDate && date.toDateString() === dragOverDate.toDateString();
  const canDrop = canDropOnDate(date);

  const handleDayClick = () => {
    selectDate(date);
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const getDayClasses = () => {
    const baseClasses = 'bg-white min-h-24 p-2 cursor-pointer transition-colors duration-200 relative';
    const monthClasses = isCurrentMonth ? 'text-gray-900' : 'text-gray-400 bg-gray-50';
    const todayClasses = isToday ? 'bg-blue-50 border-2 border-blue-200' : 'border border-gray-100';
    const selectedClasses = isSelected ? 'ring-2 ring-blue-500' : '';
    const dragClasses = isDragOver && canDrop ? 'bg-blue-100 border-2 border-blue-400' : '';

    return `${baseClasses} ${monthClasses} ${todayClasses} ${selectedClasses} ${dragClasses}`;
  };

  return (
    <>
      <div
        className={getDayClasses()}
        onClick={handleDayClick}
        onDragOver={(e) => handleDragOver(e, date)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, date)}
      >
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
            {date.getDate()}
          </span>
          {dayEvents.length > 3 && (
            <span className="text-xs text-gray-500">
              +{dayEvents.length - 3}
            </span>
          )}
        </div>
        <div className="mt-1 space-y-1">
          {dayEvents.slice(0, 3).map(event => (
            <EventCard
              key={event.id}
              event={event}
              onClick={(e) => handleEventClick(event, e)}
            />
          ))}
        </div>
      </div>

      {showEventModal && (
        <EventModal
          isOpen={showEventModal}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
          selectedDate={selectedEvent ? null : date}
        />
      )}
    </>
  );
};

export default CalendarDay;
