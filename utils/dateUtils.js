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
  getDaysInMonth,
  startOfDay
} from 'date-fns';

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


export const parseDate = (dateString) => {
  if (typeof dateString === 'string') {
    
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day); 
    }
    
    return parseISO(dateString);
  }
  return new Date(dateString);
};


export const createDateString = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


export const normalizeDate = (date) => {
  return startOfDay(parseDate(date));
};

export const generateRecurringDates = (startDate, endDate, recurrenceType, customInterval = 1, selectedDays = []) => {
  const dates = [];
  let currentDate = new Date(normalizeDate(startDate));
  const end = new Date(normalizeDate(endDate));
  
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
