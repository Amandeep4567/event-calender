//Sidebar.js
import React from 'react';
import { Calendar, Clock, Repeat, Filter } from 'lucide-react';
import { useEventContext } from '../../context/EventContext';
import { formatDate } from '../../utils/dateUtils';

const Sidebar = () => {
  const { events, selectedDate, navigateToDate } = useEventContext();
  
  const todayEvents = events.filter(event => 
    event.startDate === formatDate(new Date())
  );

  const upcomingEvents = events
    .filter(event => new Date(event.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 5);

  const recurringEvents = events.filter(event => 
    event.recurrence?.type !== 'none'
  );

  const handleDateClick = (dateString) => {
    const date = new Date(dateString);
    navigateToDate(date);
  };

  return (
    <div className="w-80 bg-white shadow-sm border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Today's Events
          </h2>
          {todayEvents.length === 0 ? (
            <p className="text-sm text-gray-500">No events today</p>
          ) : (
            <div className="space-y-2">
              {todayEvents.map(event => (
                <div
                  key={event.id}
                  className="p-3 bg-gray-50 rounded-lg border-l-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  style={{ borderLeftColor: event.color }}
                  onClick={() => handleDateClick(event.startDate)}
                >
                  <h3 className="font-medium text-gray-900 text-sm">{event.title}</h3>
                  {event.startTime && (
                    <p className="text-xs text-gray-600 mt-1">{event.startTime}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-600" />
            Upcoming Events
          </h2>
          {upcomingEvents.length === 0 ? (
            <p className="text-sm text-gray-500">No upcoming events</p>
          ) : (
            <div className="space-y-2">
              {upcomingEvents.map(event => (
                <div
                  key={event.id}
                  className="p-3 bg-gray-50 rounded-lg border-l-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  style={{ borderLeftColor: event.color }}
                  onClick={() => handleDateClick(event.startDate)}
                >
                  <h3 className="font-medium text-gray-900 text-sm">{event.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {formatDate(new Date(event.startDate), 'MMM d, yyyy')}
                    {event.startTime && ` at ${event.startTime}`}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Repeat className="w-5 h-5 mr-2 text-purple-600" />
            Recurring Events
          </h2>
          {recurringEvents.length === 0 ? (
            <p className="text-sm text-gray-500">No recurring events</p>
          ) : (
            <div className="space-y-2">
              {recurringEvents.slice(0, 5).map(event => (
                <div
                  key={event.id}
                  className="p-3 bg-gray-50 rounded-lg border-l-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  style={{ borderLeftColor: event.color }}
                  onClick={() => handleDateClick(event.startDate)}
                >
                  <h3 className="font-medium text-gray-900 text-sm">{event.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {event.recurrence.type} recurring
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2 text-orange-600" />
            Quick Stats
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-700">Total Events</span>
              <span className="font-semibold text-blue-600">{events.length}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-700">Today</span>
              <span className="font-semibold text-green-600">{todayEvents.length}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
              <span className="text-sm text-gray-700">Recurring</span>
              <span className="font-semibold text-purple-600">{recurringEvents.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
