import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useStore } from '../../app/store';
import Icons from '../Icons/Icons';
import styles from './MiniCalendar.module.css';

function MiniCalendar({ onMonthChange, onDaySelect, selectedDay }) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const events = useStore((state) => state.events);
  const setFilter = useStore((state) => state.setFilter);
  const filters = useStore((state) => state.filters);

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  useEffect(() => {
    if (onMonthChange) {
      onMonthChange(currentMonth);
    }
  }, [currentMonth, onMonthChange]);

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const goToToday = () => {
    setCurrentMonth(dayjs());
  };

  const hasEventsOnDate = (date) => {
    return events.some(event => {
      const eventDate = dayjs(event.start_datetime);
      return eventDate.format('YYYY-MM-DD') === date.format('YYYY-MM-DD');
    });
  };

  const handleDateClick = (date) => {
    // Check if clicking the same date again
    const isSameDate = selectedDay && selectedDay.format('YYYY-MM-DD') === date.format('YYYY-MM-DD');
    
    if (isSameDate) {
      // Deselect if clicking same date
      if (onDaySelect) {
        onDaySelect(null);
      }
    } else {
      // Select new date
      if (onDaySelect) {
        onDaySelect(date);
      }
    }
  };

  const isSelected = (date) => {
    if (!selectedDay) return false;
    const dateStr = date.format('YYYY-MM-DD');
    return selectedDay.format('YYYY-MM-DD') === dateStr;
  };

  const isToday = (date) => {
    return date.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
  };

  // Generate calendar days
  const days = [];
  let day = startDate;
  
  while (day.isBefore(endDate, 'day') || day.isSame(endDate, 'day')) {
    days.push(day);
    day = day.add(1, 'day');
  }

  return (
    <div className={styles.miniCalendar}>
      <div className={styles.header}>
        <button 
          type="button"
          onClick={prevMonth} 
          className={styles.navBtn}
          aria-label="Previous month"
        >
          <Icons.ChevronLeft size={20} />
        </button>
        <h3 className={styles.monthYear}>
          {currentMonth.format('MMMM YYYY')}
        </h3>
        <button 
          type="button"
          onClick={nextMonth} 
          className={styles.navBtn}
          aria-label="Next month"
        >
          <Icons.ChevronRight size={20} />
        </button>
      </div>

      <button 
        type="button"
        onClick={goToToday} 
        className={styles.todayBtn}
      >
        Today
      </button>

      <div className={styles.weekdays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.days}>
        {days.map((date, index) => {
          const isCurrentMonth = date.month() === currentMonth.month();
          const hasEvents = hasEventsOnDate(date);
          const selected = isSelected(date);
          const today = isToday(date);

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleDateClick(date)}
              className={`${styles.day} 
                ${!isCurrentMonth ? styles.otherMonth : ''} 
                ${hasEvents ? styles.hasEvents : ''}
                ${selected ? styles.selected : ''}
                ${today ? styles.today : ''}`}
              title={hasEvents ? `Has events - Click to view` : 'Click to view this date'}
            >
              {date.date()}
              {hasEvents && <span className={styles.eventDot}></span>}
            </button>
          );
        })}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendDot}></span>
          <span>Has events</span>
        </div>
        {selectedDay && (
          <div className={styles.legendItem}>
            <span className={styles.legendSelection}>📌</span>
            <span>Selected</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MiniCalendar;
