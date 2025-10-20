import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { adminListEvents, adminPublishEvent, adminArchiveEvent, notifyMailer } from '../../services/apiSupabase';
import Icons from '../../components/Icons/Icons';
import styles from './AdminEvents.module.css';

function AdminEvents() {
  const { status: statusParam } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(statusParam || 'under_review');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadEvents();
  }, [filter]);

  async function loadEvents() {
    setLoading(true);
    try {
      const data = await adminListEvents(filter === 'all' ? null : filter);
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePublish(event) {
    if (!confirm(`Publish "${event.title}"? This will make it visible to the public and send an email to the organizer.`)) {
      return;
    }

    setActionLoading(event.id);
    try {
      const updatedEvent = await adminPublishEvent(event.id);
      
      // Send publication email
      await notifyMailer('published', updatedEvent);
      
      alert('Event published successfully! Email sent to organizer.');
      loadEvents();
    } catch (error) {
      console.error('Publish failed:', error);
      alert('Failed to publish event: ' + error.message);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleArchive(event) {
    if (!confirm(`Archive "${event.title}"? This will hide it from the public calendar.`)) {
      return;
    }

    setActionLoading(event.id);
    try {
      await adminArchiveEvent(event.id);
      alert('Event archived successfully!');
      loadEvents();
    } catch (error) {
      console.error('Archive failed:', error);
      alert('Failed to archive event: ' + error.message);
    } finally {
      setActionLoading(null);
    }
  }

  const filteredEvents = events.filter((event) =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.organizer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusCounts = {
    under_review: events.filter(e => e.status === 'under_review').length,
    published: events.filter(e => e.status === 'published').length,
    archived: events.filter(e => e.status === 'archived').length,
  };

  return (
    <div className={styles.adminEvents}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>
            <Icons.Grid size={32} />
            Event Management
          </h1>
          <p className={styles.pageSubtitle}>Review and manage event submissions</p>
        </div>
      </header>

      <div className={styles.filterBar}>
        <div className={styles.filterTabs}>
          <button
            className={`${styles.filterTab} ${filter === 'under_review' ? styles.active : ''}`}
            onClick={() => setFilter('under_review')}
          >
            <Icons.Clock size={18} />
            Pending
            {statusCounts.under_review > 0 && (
              <span className={styles.badge}>{statusCounts.under_review}</span>
            )}
          </button>

          <button
            className={`${styles.filterTab} ${filter === 'published' ? styles.active : ''}`}
            onClick={() => setFilter('published')}
          >
            <Icons.CalendarCheck size={18} />
            Published
            {statusCounts.published > 0 && (
              <span className={styles.badgeGreen}>{statusCounts.published}</span>
            )}
          </button>

          <button
            className={`${styles.filterTab} ${filter === 'archived' ? styles.active : ''}`}
            onClick={() => setFilter('archived')}
          >
            <Icons.Archive size={18} />
            Archived
            {statusCounts.archived > 0 && (
              <span className={styles.badgeGray}>{statusCounts.archived}</span>
            )}
          </button>
        </div>

        <div className={styles.searchBox}>
          <Icons.Search size={18} />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <Icons.Clock size={48} />
          <p>Loading events...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className={styles.emptyState}>
          <Icons.Search size={64} />
          <h3>No events found</h3>
          <p>
            {searchTerm
              ? `No events match "${searchTerm}"`
              : filter === 'under_review'
              ? 'No pending submissions'
              : filter === 'published'
              ? 'No published events'
              : 'No archived events'}
          </p>
        </div>
      ) : (
        <div className={styles.eventsList}>
          {filteredEvents.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.eventInfo}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                
                <div className={styles.eventMeta}>
                  <span className={styles.metaItem}>
                    <Icons.Calendar size={16} />
                    {new Date(event.start_datetime).toLocaleDateString()}
                  </span>
                  
                  <span className={styles.metaItem}>
                    <Icons.MapPin size={16} />
                    {event.city || 'Online'}, {event.country_code || ''}
                  </span>
                  
                  <span className={styles.metaItem}>
                    <Icons.Users size={16} />
                    {event.organizer_name}
                  </span>

                  <span className={`${styles.modalityBadge} ${styles[event.modality]}`}>
                    {event.modality}
                  </span>
                </div>

                {event.summary && (
                  <p className={styles.eventSummary}>{event.summary}</p>
                )}
              </div>

              <div className={styles.eventActions}>
                <Link
                  to={`/admin/events/${event.id}`}
                  className={`btn btn-outline ${styles.actionBtn}`}
                >
                  <Icons.Edit size={18} />
                  Edit
                </Link>

                {event.status === 'under_review' && (
                  <button
                    onClick={() => handlePublish(event)}
                    disabled={actionLoading === event.id}
                    className={`btn btn-primary ${styles.actionBtn}`}
                  >
                    <Icons.CalendarCheck size={18} />
                    {actionLoading === event.id ? 'Publishing...' : 'Publish'}
                  </button>
                )}

                {event.status === 'published' && (
                  <button
                    onClick={() => handleArchive(event)}
                    disabled={actionLoading === event.id}
                    className={`btn btn-outline ${styles.actionBtn}`}
                  >
                    <Icons.Archive size={18} />
                    {actionLoading === event.id ? 'Archiving...' : 'Archive'}
                  </button>
                )}

                <a
                  href={`/event/${event.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-text ${styles.viewLink}`}
                >
                  <Icons.ExternalLink size={16} />
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminEvents;

