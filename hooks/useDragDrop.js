//useDragDrop.js
import { useState, useCallback } from 'react';
import { createDragData, parseDragData, setDragData, isDragDataValid } from '../utils/dragDropUtils';

export const useDragDrop = (onEventMove) => {
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [dragOverDate, setDragOverDate] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback((event, eventData) => {
    const dragData = createDragData(eventData);
    setDragData(event.dataTransfer, dragData);
    setDraggedEvent(eventData);
    setIsDragging(true);

    event.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedEvent(null);
    setDragOverDate(null);
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((event, date) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDragOverDate(date);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverDate(null);
  }, []);

  const handleDrop = useCallback((event, targetDate) => {
    event.preventDefault();

    const dragData = parseDragData(event.dataTransfer);

    if (!isDragDataValid(dragData)) {
      console.error('Invalid drag data');
      return;
    }

    const eventToMove = dragData.event;

    if (onEventMove) {
      onEventMove(eventToMove.id, targetDate);
    }

    setDraggedEvent(null);
    setDragOverDate(null);
    setIsDragging(false);
  }, [onEventMove]);

  const canDropOnDate = useCallback((date) => {
    if (!draggedEvent) return false;

    const eventDate = new Date(draggedEvent.startDate);
    return !date || date.getTime() !== eventDate.getTime();
  }, [draggedEvent]);

  return {
    draggedEvent,
    dragOverDate,
    isDragging,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    canDropOnDate
  };
};
