//dragDropUtils.js
import { DRAG_TYPES } from './constants';

export const createDragData = (event) => {
  return {
    type: DRAG_TYPES.EVENT,
    event: event,
    timestamp: Date.now()
  };
};

export const parseDragData = (dataTransfer) => {
  try {
    const data = dataTransfer.getData('application/json');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

export const setDragData = (dataTransfer, data) => {
  dataTransfer.setData('application/json', JSON.stringify(data));
  dataTransfer.effectAllowed = 'move';
};

export const isDragDataValid = (dragData) => {
  return dragData &&
    dragData.type === DRAG_TYPES.EVENT &&
    dragData.event &&
    dragData.event.id;
};

export const calculateDropPosition = (event, element) => {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return {
    x: Math.max(0, Math.min(x, rect.width)),
    y: Math.max(0, Math.min(y, rect.height)),
    relativeX: x / rect.width,
    relativeY: y / rect.height
  };
};

export const getDropIndicatorPosition = (dragOverEvent, dayElement) => {
  const rect = dayElement.getBoundingClientRect();
  const y = dragOverEvent.clientY - rect.top;
  const height = rect.height;

  if (y < height * 0.33) return 'top';
  if (y > height * 0.67) return 'bottom';
  return 'middle';
};

export const createDragImage = (element, title) => {
  const dragImage = document.createElement('div');
  dragImage.className = 'bg-blue-500 text-white px-3 py-1 rounded shadow-lg text-sm';
  dragImage.textContent = title;
  dragImage.style.position = 'absolute';
  dragImage.style.top = '-1000px';
  dragImage.style.left = '-1000px';
  dragImage.style.zIndex = '9999';

  document.body.appendChild(dragImage);

  setTimeout(() => {
    document.body.removeChild(dragImage);
  }, 0);

  return dragImage;
};
