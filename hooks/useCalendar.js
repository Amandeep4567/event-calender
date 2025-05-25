//useCalendar.js
import { useState, useMemo } from 'react';
import { getMonthDays, nextMonth, prevMonth } from '../utils/dateUtils';

export const useCalendar = (initialDate = new Date()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState('month');

  const monthDays = useMemo(() => {
    return getMonthDays(currentDate);
  }, [currentDate]);

  const navigateToNextMonth = () => {
    setCurrentDate(nextMonth(currentDate));
  };

  const navigateToPrevMonth = () => {
    setCurrentDate(prevMonth(currentDate));
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const navigateToDate = (date) => {
    setCurrentDate(date);
    setSelectedDate(date);
  };

  const selectDate = (date) => {
    setSelectedDate(date);
  };

  const getCurrentMonth = () => {
    return currentDate.getMonth();
  };

  const getCurrentYear = () => {
    return currentDate.getFullYear();
  };

  const getMonthName = () => {
    return currentDate.toLocaleString('default', { month: 'long' });
  };

  const getMonthYear = () => {
    return `${getMonthName()} ${getCurrentYear()}`;
  };

  return {
    currentDate,
    selectedDate,
    view,
    monthDays,
    navigateToNextMonth,
    navigateToPrevMonth,
    navigateToToday,
    navigateToDate,
    selectDate,
    setView,
    getCurrentMonth,
    getCurrentYear,
    getMonthName,
    getMonthYear
  };
};
