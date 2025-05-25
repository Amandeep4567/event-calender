// eventUtils.js - Fixed version to prevent date shifting
import { generateRecurringDates, isSameDayUtil, parseDate, formatLocalDate } from './dateUtils';

export const generateEventId = () => {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const createEvent = (eventData) => {
  // Ensure dates are stored as local date strings (YYYY-MM-DD)
  const startDate = eventData.startDate instanceof Date 
    ? formatLocalDate(eventData.startDate)
    : eventData.startDate;
    
  const endDate = eventData.endDate instanceof Date
    ? formatLocalDate(eventData.endDate)
    : (eventData.endDate || startDate);

  return {
    id: generateEventId(),
    title: eventData.title,
    description: eventData.description || '',
    startDate: startDate,
    endDate: endDate,
    startTime: eventData.startTime,
    endTime: eventData.endTime,
    color: eventData.color || '#3b82f6',
    recurrence: {
      type: eventData.recurrence?.type || 'none',
      interval: eventData.recurrence?.interval || 1,
      selectedDays: eventData.recurrence?.selectedDays || [],
      endDate: eventData.recurrence?.endDate || null
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const expandRecurringEvents = (events) => {
  const expandedEvents = [];

  events.forEach(event => {
    if (event.recurrence.type === 'none') {
      expandedEvents.push(event);
    } else {
      const endDate = event.recurrence.endDate ?
        parseDate(event.recurrence.endDate) :
        new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

      const recurringDates = generateRecurringDates(
        parseDate(event.startDate),
        endDate,
        event.recurrence.type,
        event.recurrence.interval,
        event.recurrence.selectedDays
      );

      recurringDates.forEach((date, index) => {
        expandedEvents.push({
          ...event,
          id: index === 0 ? event.id : `${event.id}_${index}`,
          startDate: formatLocalDate(date),
          endDate: formatLocalDate(date),
          isRecurring: true,
          originalEventId: event.id,
          recurrenceIndex: index
        });
      });
    }
  });

  return expandedEvents;
};

export const getEventsForDate = (events, date) => {
  return events.filter(event =>
    isSameDayUtil(parseDate(event.startDate), date)
  );
};

export const checkEventConflict = (newEvent, existingEvents) => {
  const newStart = new Date(`${newEvent.startDate} ${newEvent.startTime}`);
  const newEnd = new Date(`${newEvent.endDate || newEvent.startDate} ${newEvent.endTime}`);

  return existingEvents.some(event => {
    if (event.id === newEvent.id) return false;

    const existingStart = new Date(`${event.startDate} ${event.startTime}`);
    const existingEnd = new Date(`${event.endDate || event.startDate} ${event.endTime}`);

    return (newStart < existingEnd && newEnd > existingStart);
  });
};

export const updateEventDate = (event, newDate) => {
  return {
    ...event,
    startDate: formatLocalDate(newDate),
    endDate: formatLocalDate(newDate),
    updatedAt: new Date().toISOString()
  };
};

export const filterEventsBySearch = (events, searchTerm) => {
  if (!searchTerm) return events;

  const term = searchTerm.toLowerCase();
  return events.filter(event =>
    event.title.toLowerCase().includes(term) ||
    event.description.toLowerCase().includes(term)
  );
};

export const groupEventsByDate = (events) => {
  return events.reduce((groups, event) => {
    const date = event.startDate;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {});
};
