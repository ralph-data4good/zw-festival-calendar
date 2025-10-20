import React, { useState, useEffect } from 'react';
import { useStore } from '../app/store';
import EventCard from '../components/EventCard/EventCard';
import EventDrawer from '../components/EventDrawer/EventDrawer';
import Filters from '../components/Filters/Filters';
import Chips from '../components/Chips/Chips';
import MiniCalendar from '../components/MiniCalendar/MiniCalendar';
import Icons from '../components/Icons/Icons';
import { getQueryParam } from '../utils/url';
import dayjs from 'dayjs';
import styles from './Calendar.module.css';

function Calendar() {
  const getFilteredEvents = useStore((state) => state.getFilteredEvents);
  const events = useStore((state) => state.events);
  const loading = useStore((state) => state.loading);
  const filters = useStore((state) => state.filters);
  const resetFilters = useStore((state) => state.resetFilters);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllPast, setShowAllPast] = useState(false);

  useEffect(() => {
    const eventId = getQueryParam('event');
    if (eventId) {
      const event = events.find((e) => e.id === eventId);
      if (event) {
        setSelectedEvent(event);
      }
    }
  }, [events]);

  const filteredEvents = getFilteredEvents();

  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.start_datetime) - new Date(b.start_datetime)
  );

  const now = dayjs();
  const allUpcomingEvents = sortedEvents.filter(event => 
    dayjs(event.start_datetime).isAfter(now) || dayjs(event.start_datetime).isSame(now, 'day')
  );
  const allPastEvents = sortedEvents.filter(event => 
    dayjs(event.start_datetime).isBefore(now, 'day')
  );

  // Get events in the currently displayed calendar month
  const startOfMonth = currentCalendarMonth.startOf('month');
  const endOfMonth = currentCalendarMonth.endOf('month');
  const eventsInCalendarMonth = sortedEvents.filter(event => {
    const eventDate = dayjs(event.start_datetime);
    return eventDate.isAfter(startOfMonth.subtract(1, 'day')) && 
           eventDate.isBefore(endOfMonth.add(1, 'day'));
  });

  // Filter upcoming/past events to only show those in calendar view by default
  const upcomingInMonth = allUpcomingEvents.filter(event => {
    const eventDate = dayjs(event.start_datetime);
    return eventDate.isAfter(startOfMonth.subtract(1, 'day')) && 
           eventDate.isBefore(endOfMonth.add(1, 'day'));
  });

  const pastInMonth = allPastEvents.filter(event => {
    const eventDate = dayjs(event.start_datetime);
    return eventDate.isAfter(startOfMonth.subtract(1, 'day')) && 
           eventDate.isBefore(endOfMonth.add(1, 'day'));
  });

  // Determine which events to show based on "See More" state
  const upcomingEvents = showAllUpcoming ? allUpcomingEvents : upcomingInMonth;
  const pastEvents = showAllPast ? allPastEvents : pastInMonth;

  // Get events for selected day
  const eventsOnSelectedDay = selectedDay ? sortedEvents.filter(event => {
    return dayjs(event.start_datetime).isSame(selectedDay, 'day');
  }) : [];

  const groupEventsByDate = (events) => {
    const grouped = {};
    events.forEach(event => {
      const dateKey = dayjs(event.start_datetime).format('YYYY-MM-DD');
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });
    return grouped;
  };

  const upcomingByDate = groupEventsByDate(upcomingEvents);
  const pastByDate = groupEventsByDate(pastEvents);

  const hasActiveFilters = 
    filters.q || 
    filters.country || 
    filters.category || 
    filters.modality || 
    filters.topics.length > 0 ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.campaign;

  const handleExportToGoogleCalendar = () => {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    
    if (filteredEvents.length === 1) {
      const event = filteredEvents[0];
      const params = new URLSearchParams({
        text: event.title,
        dates: `${dayjs(event.start_datetime).format('YYYYMMDDTHHmmss')}/${dayjs(event.end_datetime).format('YYYYMMDDTHHmmss')}`,
        details: event.summary || '',
        location: event.venue_name || event.address || event.country || '',
      });
      window.open(`${baseUrl}&${params.toString()}`, '_blank');
    } else {
      alert(`Found ${filteredEvents.length} events. Opening Google Calendar - you can add events individually by clicking "Add to Calendar" on each event.`);
      window.open('https://calendar.google.com', '_blank');
    }
  };

  const handleDaySelect = (date) => {
    setSelectedDay(date);
    // Scroll to the selected day section
    setTimeout(() => {
      const element = document.getElementById('selected-day-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleClearDaySelection = () => {
    setSelectedDay(null);
  };

  if (loading) {
    return <div className="loading">Loading calendar...</div>;
  }

  const renderDateGroup = (dateKey, events) => {
    const date = dayjs(dateKey);
    const isToday = date.isSame(dayjs(), 'day');
    const isTomorrow = date.isSame(dayjs().add(1, 'day'), 'day');
    
    let dateLabel = date.format('ddd, MMM D, YYYY');
    if (isToday) dateLabel = `Today, ${date.format('MMM D')}`;
    if (isTomorrow) dateLabel = `Tomorrow, ${date.format('MMM D')}`;

    return (
      <div key={dateKey} className={styles.dateGroup}>
        <div className={styles.dateHeader}>
          <div className={styles.dateLine}></div>
          <h3 className={`${styles.dateLabel} ${isToday ? styles.today : ''}`}>
            {dateLabel}
          </h3>
          <div className={styles.dateLine}></div>
        </div>
        <div className={styles.dateEvents}>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={(evt) => setSelectedEvent(evt)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.calendar}>
      <div className="container">
        <header className="page-header">
          <h1 className="h1"><Icons.Calendar size={36} /> Event Calendar</h1>
          <p>Explore all events happening worldwide</p>
        </header>

        <Chips />

        <div className={styles.calendarLayout}>
          <aside className={styles.sidebar}>
            <div className={styles.mobileControls}>
              <button
                type="button"
                className={styles.toggleBtn}
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <Icons.Calendar size={18} />
                {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
              </button>
              <button
                type="button"
                className={styles.toggleBtn}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Icons.Filter size={18} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
                {hasActiveFilters && <span className={styles.activeDot}>•</span>}
              </button>
            </div>

            <div className={`${styles.calendarSection} ${showCalendar ? styles.visible : ''}`}>
              <MiniCalendar 
                onMonthChange={setCurrentCalendarMonth}
                onDaySelect={handleDaySelect}
                selectedDay={selectedDay}
              />
              <button
                type="button"
                className={styles.googleCalendarBtn}
                onClick={handleExportToGoogleCalendar}
              >
                <Icons.CalendarCheck size={18} />
                Add to Google Calendar
              </button>
            </div>

            <div className={styles.sidebarDivider}></div>

            <div className={`${styles.filtersSection} ${showFilters ? styles.visible : ''}`}>
              <Filters compact={false} />
            </div>
          </aside>

          <div className={styles.results}>
            <div className={styles.resultsHeader}>
              <div className={styles.resultsInfo}>
                <div className={styles.eventCounts}>
                  <h2 className={styles.resultsCount}>
                    {sortedEvents.length} {sortedEvents.length === 1 ? 'Event' : 'Events'}
                  </h2>
                  <div className={styles.countBreakdown}>
                    {allUpcomingEvents.length > 0 && (
                      <span className={styles.upcomingBadge}>
                        {allUpcomingEvents.length} Upcoming
                      </span>
                    )}
                    {allPastEvents.length > 0 && (
                      <span className={styles.pastBadge}>
                        {allPastEvents.length} Past
                      </span>
                    )}
                  </div>
                </div>
                {hasActiveFilters && (
                  <button 
                    onClick={resetFilters} 
                    className={styles.clearBtn}
                    type="button"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              <div className={styles.viewToggle}>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
                  onClick={() => setViewMode('grid')}
                  type="button"
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <Icons.Grid size={18} />
                </button>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewBtnActive : ''}`}
                  onClick={() => setViewMode('list')}
                  type="button"
                  aria-label="List view"
                  title="List view"
                >
                  <Icons.List size={18} />
                </button>
              </div>
            </div>

            {sortedEvents.length === 0 ? (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}><Icons.Search size={48} /></div>
                <h3>No events found</h3>
                <p>Try adjusting your filters or search criteria.</p>
                {hasActiveFilters && (
                  <button 
                    onClick={resetFilters} 
                    className="btn btn-primary"
                    type="button"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className={styles.eventsContainer}>
                {/* Selected Day Section */}
                {selectedDay && eventsOnSelectedDay.length > 0 && (
                  <div id="selected-day-section" className={styles.selectedDaySection}>
                    <div className={styles.selectedDayHeader}>
                      <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>📌</span>
                        Events on {selectedDay.format('MMMM D, YYYY')}
                      </h2>
                      <button
                        type="button"
                        className={styles.clearDayBtn}
                        onClick={handleClearDaySelection}
                      >
                        Clear Selection
                      </button>
                    </div>
                    <div className={viewMode === 'grid' ? 'grid grid-2' : styles.listViewContainer}>
                      {viewMode === 'grid' ? (
                        eventsOnSelectedDay.map((event) => (
                          <EventCard
                            key={event.id}
                            event={event}
                            onClick={(evt) => setSelectedEvent(evt)}
                          />
                        ))
                      ) : (
                        renderDateGroup(selectedDay.format('YYYY-MM-DD'), eventsOnSelectedDay)
                      )}
                    </div>
                  </div>
                )}

                {viewMode === 'grid' ? (
                  <>
                    {upcomingEvents.length > 0 && (
                      <div className={styles.eventSection}>
                        <div className={styles.sectionHeader}>
                          <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}><Icons.TrendingUp size={24} /></span>
                            Upcoming Events
                            {!showAllUpcoming && upcomingInMonth.length < allUpcomingEvents.length && (
                              <span className={styles.monthIndicator}>
                                in {currentCalendarMonth.format('MMMM')}
                              </span>
                            )}
                          </h2>
                          <span className={styles.sectionCount}>
                            {upcomingEvents.length}
                          </span>
                        </div>
                        <div className="grid grid-2">
                          {upcomingEvents.map((event) => (
                            <EventCard
                              key={event.id}
                              event={event}
                              onClick={(evt) => setSelectedEvent(evt)}
                            />
                          ))}
                        </div>
                        {!showAllUpcoming && upcomingInMonth.length < allUpcomingEvents.length && (
                          <button
                            type="button"
                            className={styles.seeMoreBtn}
                            onClick={() => setShowAllUpcoming(true)}
                          >
                            See More ({allUpcomingEvents.length - upcomingInMonth.length} more events)
                          </button>
                        )}
                        {showAllUpcoming && upcomingInMonth.length < allUpcomingEvents.length && (
                          <button
                            type="button"
                            className={styles.seeLessBtn}
                            onClick={() => setShowAllUpcoming(false)}
                          >
                            Show Less (Only {currentCalendarMonth.format('MMMM')})
                          </button>
                        )}
                      </div>
                    )}

                    {pastEvents.length > 0 && (
                      <div className={styles.eventSection}>
                        <div className={styles.sectionHeader}>
                          <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}><Icons.Archive size={24} /></span>
                            Past Events
                            {!showAllPast && pastInMonth.length < allPastEvents.length && (
                              <span className={styles.monthIndicator}>
                                in {currentCalendarMonth.format('MMMM')}
                              </span>
                            )}
                          </h2>
                          <span className={styles.sectionCount}>
                            {pastEvents.length}
                          </span>
                        </div>
                        <div className="grid grid-2">
                          {pastEvents.map((event) => (
                            <EventCard
                              key={event.id}
                              event={event}
                              onClick={(evt) => setSelectedEvent(evt)}
                            />
                          ))}
                        </div>
                        {!showAllPast && pastInMonth.length < allPastEvents.length && (
                          <button
                            type="button"
                            className={styles.seeMoreBtn}
                            onClick={() => setShowAllPast(true)}
                          >
                            See More ({allPastEvents.length - pastInMonth.length} more events)
                          </button>
                        )}
                        {showAllPast && pastInMonth.length < allPastEvents.length && (
                          <button
                            type="button"
                            className={styles.seeLessBtn}
                            onClick={() => setShowAllPast(false)}
                          >
                            Show Less (Only {currentCalendarMonth.format('MMMM')})
                          </button>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {upcomingEvents.length > 0 && (
                      <div className={styles.eventSection}>
                        <div className={styles.sectionHeader}>
                          <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}><Icons.TrendingUp size={24} /></span>
                            Upcoming Events
                            {!showAllUpcoming && upcomingInMonth.length < allUpcomingEvents.length && (
                              <span className={styles.monthIndicator}>
                                in {currentCalendarMonth.format('MMMM')}
                              </span>
                            )}
                          </h2>
                          <span className={styles.sectionCount}>
                            {upcomingEvents.length}
                          </span>
                        </div>
                        {Object.keys(upcomingByDate)
                          .sort()
                          .map(dateKey => renderDateGroup(dateKey, upcomingByDate[dateKey]))}
                        {!showAllUpcoming && upcomingInMonth.length < allUpcomingEvents.length && (
                          <button
                            type="button"
                            className={styles.seeMoreBtn}
                            onClick={() => setShowAllUpcoming(true)}
                          >
                            See More ({allUpcomingEvents.length - upcomingInMonth.length} more events)
                          </button>
                        )}
                        {showAllUpcoming && upcomingInMonth.length < allUpcomingEvents.length && (
                          <button
                            type="button"
                            className={styles.seeLessBtn}
                            onClick={() => setShowAllUpcoming(false)}
                          >
                            Show Less (Only {currentCalendarMonth.format('MMMM')})
                          </button>
                        )}
                      </div>
                    )}

                    {pastEvents.length > 0 && (
                      <div className={styles.eventSection}>
                        <div className={styles.sectionHeader}>
                          <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}><Icons.Archive size={24} /></span>
                            Past Events
                            {!showAllPast && pastInMonth.length < allPastEvents.length && (
                              <span className={styles.monthIndicator}>
                                in {currentCalendarMonth.format('MMMM')}
                              </span>
                            )}
                          </h2>
                          <span className={styles.sectionCount}>
                            {pastEvents.length}
                          </span>
                        </div>
                        {Object.keys(pastByDate)
                          .sort()
                          .reverse()
                          .map(dateKey => renderDateGroup(dateKey, pastByDate[dateKey]))}
                        {!showAllPast && pastInMonth.length < allPastEvents.length && (
                          <button
                            type="button"
                            className={styles.seeMoreBtn}
                            onClick={() => setShowAllPast(true)}
                          >
                            See More ({allPastEvents.length - pastInMonth.length} more events)
                          </button>
                        )}
                        {showAllPast && pastInMonth.length < allPastEvents.length && (
                          <button
                            type="button"
                            className={styles.seeLessBtn}
                            onClick={() => setShowAllPast(false)}
                          >
                            Show Less (Only {currentCalendarMonth.format('MMMM')})
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <EventDrawer event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}

export default Calendar;
