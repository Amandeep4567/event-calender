// dateUtils.js - Fixed version to prevent date shifting
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
  isToday,
  parseISO,
  addDays,
  addWeeks,
  addMonths as addMonthsDateFns,
  setDate,
  getDate,
  getDaysInMonth
} from 'date-fns';

// Helper function to create local date without timezone issues
export const createLocalDate = (year, month, day) => {
  return new Date(year, month, day);
};

// Helper function to format date as YYYY-MM-DD in local timezone
export const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper function to parse YYYY-MM-DD string as local date
export const parseLocalDate = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const formatDate = (date, formatString = 'yyyy-MM-dd') => {
  return format(date, formatString);
};

export const formatTime = (date) => {
  return format(date, 'HH:mm');
};

export const formatDateTime = (date) => {
  return format(date, 'yyyy-MM-dd HH:mm');
};

export const getMonthDays = (date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
};

export const isSameDayUtil = (date1, date2) => {
  return isSameDay(date1, date2);
};

export const isSameMonthUtil = (date1, date2) => {
  return isSameMonth(date1, date2);
};

export const nextMonth = (date) => {
  return addMonths(date, 1);
};

export const prevMonth = (date) => {
  return subMonths(date, 1);
};

export const isTodayUtil = (date) => {
  return isToday(date);
};

// Updated parseDate to handle local dates properly
export const parseDate = (dateString) => {
  if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    // Handle YYYY-MM-DD format as local date
    return parseLocalDate(dateString);
  }
  return parseISO(dateString);
};

export const generateRecurringDates = (startDate, endDate, recurrenceType, customInterval = 1, selectedDays = []) => {
  const dates = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);
  
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    
    switch (recurrenceType) {
      case 'daily':
        currentDate = addDays(currentDate, customInterval || 1);
        break;
      case 'weekly':
        if (selectedDays.length > 0) {
          let nextDate = addDays(currentDate, 1);
          while (!selectedDays.includes(nextDate.getDay()) && nextDate <= end) {
            nextDate = addDays(nextDate, 1);
          }
          if (nextDate.getDay() === currentDate.getDay()) {
            currentDate = addWeeks(currentDate, customInterval || 1);
          } else {
            currentDate = nextDate;
          }
        } else {
          currentDate = addWeeks(currentDate, customInterval || 1);
        }
        break;
      case 'monthly':
        currentDate = addMonthsDateFns(currentDate, customInterval || 1);
        const targetDay = getDate(startDate);
        const daysInMonth = getDaysInMonth(currentDate);
        if (targetDay > daysInMonth) {
          currentDate = setDate(currentDate, daysInMonth);
        } else {
          currentDate = setDate(currentDate, targetDay);
        }
        break;
      default:
        return dates;
    }
  }
  
  return dates;
};
