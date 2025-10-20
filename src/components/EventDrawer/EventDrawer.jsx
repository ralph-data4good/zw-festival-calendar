import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fmtRange, getUserTimezone } from '../../utils/date';
import { downloadICS } from '../../services/ics';
import { setQueryParam } from '../../utils/url';
import Icons from '../Icons/Icons';
import styles from './EventDrawer.module.css';

function EventDrawer({ event, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (event) {
      setQueryParam('event', event.id);
      // Focus trap and prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      setQueryParam('event', null);
      document.body.style.overflow = '';
    }

    // Handle ESC key
    const handleEscape = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [event, onClose]);

  if (!event) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const handleDownloadICS = () => {
    downloadICS(event);
  };

  const handleViewFullDetails = () => {
    navigate(`/event/${event.id}`);
    if (onClose) onClose();
  };

  const modalityClass = event.modality?.toLowerCase().replace(' ', '') || '';
  const userTz = getUserTimezone();

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className={styles.drawer}>
        <button 
          type="button"
          className={styles.closeBtn} 
          onClick={onClose} 
          aria-label="Close"
        >
          <Icons.X size={24} />
        </button>

        {event.poster_url && (
          <img src={event.poster_url} alt={event.title} className={styles.poster} />
        )}

        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className="h2">{event.title}</h2>
            {event.modality && (
              <span className={`chip ${modalityClass}`}>{event.modality}</span>
            )}
          </div>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <strong><Icons.Calendar size={16} /> Date & Time:</strong>
              <div>{fmtRange(event.start_datetime, event.end_datetime, event.timezone)}</div>
              {event.timezone !== userTz && (
                <div className={styles.localTime}>
                  Local: {fmtRange(event.start_datetime, event.end_datetime, userTz)}
                </div>
              )}
            </div>

            {event.country && (
              <div className={styles.metaItem}>
                <strong>🌍 Location:</strong> {event.country}
                {event.city && `, ${event.city}`}
              </div>
            )}

            {event.venue_name && (
              <div className={styles.metaItem}>
                <strong><Icons.MapPin size={16} /> Venue:</strong> {event.venue_name}
              </div>
            )}

            {event.organizer_name && (
              <div className={styles.metaItem}>
                <strong><Icons.Users size={16} /> Organizer:</strong> {event.organizer_name}
              </div>
            )}
          </div>

          {event.summary && (
            <div className={styles.section}>
              <h3>About</h3>
              <p>{event.summary}</p>
            </div>
          )}

          {event.topics && event.topics.length > 0 && (
            <div className={styles.section}>
              <h3>Topics</h3>
              <div className="chips">
                {event.topics.map((topic) => (
                  <span key={topic} className="chip">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <button 
              type="button"
              className="btn btn-primary" 
              onClick={handleDownloadICS}
            >
              <Icons.Download size={18} /> Add to Calendar
            </button>
            <button 
              type="button"
              className="btn btn-outline" 
              onClick={handleViewFullDetails}
            >
              View Full Details
            </button>
            {event.registration_url && (
              <a
                href={event.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Register Now →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDrawer;
