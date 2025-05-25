//EventCard.js
import React from 'react';
import { Clock, Repeat } from 'lucide-react';
import { useEventContext } from '../../context/EventContext';

const EventCard = ({ event, onClick }) => {
  const { handleDragStart, handleDragEnd } = useEventContext();

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };

  const getEventTime = () => {
    if (event.startTime) {
      const endTime = event.endTime ? ` - ${event.endTime}` : '';
      return `${event.startTime}${endTime}`;
    }
    return null;
  };

  return (
    <div
      draggable={!event.isRecurring}
      onDragStart={(e) => handleDragStart(e, event)}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      className="group relative bg-white border border-gray-200 rounded-md p-2 hover:shadow-sm transition-shadow duration-200 cursor-pointer"
      style={{ borderLeftColor: event.color, borderLeftWidth: '3px' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-900 truncate">
            {event.title}
          </p>
          {getEventTime() && (
            <div className="flex items-center mt-1">
              <Clock className="w-3 h-3 text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">{getEventTime()}</span>
            </div>
          )}
        </div>
        {event.recurrence?.type !== 'none' && (
          <Repeat className="w-3 h-3 text-gray-400 ml-1 flex-shrink-0" />
        )}
      </div>

      {event.description && (
        <p className="text-xs text-gray-500 mt-1 truncate">
          {event.description}
        </p>
      )}

      <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-200" />
    </div>
  );
};

export default EventCard;
