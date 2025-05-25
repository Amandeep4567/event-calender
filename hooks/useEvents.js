import { useState, useCallback, useMemo } from 'react';
import { createEvent, expandRecurringEvents, checkEventConflict, updateEventDate, filterEventsBySearch } from '../utils/eventUtils';
import { useLocalStorage } from './useLocalStorage';

export const useEvents = () => {
  const { data: storedEvents, saveData, isLoading } = useLocalStorage([]);
  const [searchTerm, setSearchTerm] = useState('');

  const expandedEvents = useMemo(() => {
    return expandRecurringEvents(storedEvents);
  }, [storedEvents]);

  const filteredEvents = useMemo(() => {
    return filterEventsBySearch(expandedEvents, searchTerm);
  }, [expandedEvents, searchTerm]);

  const addEvent = useCallback((eventData) => {
    const newEvent = createEvent(eventData);
    const hasConflict = checkEventConflict(newEvent, expandedEvents);

    if (hasConflict) {
      return { success: false, error: 'Event conflicts with existing event' };
    }

    const updatedEvents = [...storedEvents, newEvent];
    saveData(updatedEvents);
    return { success: true, event: newEvent };
  }, [storedEvents, expandedEvents, saveData]);

  const updateEvent = useCallback((eventId, updatedData) => {
    const updatedEvents = storedEvents.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          ...updatedData,
          updatedAt: new Date().toISOString()
        };
      }
      return event;
    });

    saveData(updatedEvents);
    return { success: true };
  }, [storedEvents, saveData]);

  const deleteEvent = useCallback((eventId) => {
    const updatedEvents = storedEvents.filter(event => {
      if (event.id === eventId) return false;
      if (event.originalEventId === eventId) return false;
      return true;
    });

    saveData(updatedEvents);
    return { success: true };
  }, [storedEvents, saveData]);

  const moveEvent = useCallback((eventId, newDate) => {
    const eventToMove = expandedEvents.find(e => e.id === eventId);
    if (!eventToMove) return { success: false, error: 'Event not found' };

    const updatedEvent = updateEventDate(eventToMove, newDate);
    const hasConflict = checkEventConflict(updatedEvent, expandedEvents);

    if (hasConflict) {
      return { success: false, error: 'Cannot move event due to conflict' };
    }

    if (eventToMove.isRecurring) {
      return { success: false, error: 'Cannot move recurring event instances' };
    }

    const updatedEvents = storedEvents.map(event => {
      if (event.id === eventId) {
        return updatedEvent;
      }
      return event;
    });

    saveData(updatedEvents);
    return { success: true };
  }, [storedEvents, expandedEvents, saveData]);

  const getEventById = useCallback((eventId) => {
    return expandedEvents.find(event => event.id === eventId);
  }, [expandedEvents]);

  const getEventsForDate = useCallback((date) => {
    const dateString = date.toISOString().split('T')[0];
    return filteredEvents.filter(event => event.startDate === dateString);
  }, [filteredEvents]);

  return {
    events: filteredEvents,
    rawEvents: storedEvents,
    isLoading,
    searchTerm,
    setSearchTerm,
    addEvent,
    updateEvent,
    deleteEvent,
    moveEvent,
    getEventById,
    getEventsForDate
  };
};
