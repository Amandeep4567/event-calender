import React, { createContext, useContext } from 'react';
import { useEvents } from '../hooks/useEvents';
import { useCalendar } from '../hooks/useCalendar';
import { useDragDrop } from '../hooks/useDragDrop';

const EventContext = createContext();

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const eventsHook = useEvents();
  const calendarHook = useCalendar();
  const dragDropHook = useDragDrop(eventsHook.moveEvent);

  const value = {
    ...eventsHook,
    ...calendarHook,
    ...dragDropHook
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};
