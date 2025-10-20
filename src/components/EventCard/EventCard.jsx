import React from 'react';
import { Link } from 'react-router-dom';
import { fmtDate, fmtTime } from '../../utils/date';
import styles from './EventCard.module.css';

function EventCard({ event, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(event);
    }
  };

  const modalityClass = event.modality?.toLowerCase().replace(' ', '') || '';

  return (
    <Link
      to={`/event/${event.id}`}
      className={`card ${styles.eventCard}`}
      onClick={handleClick}
    >
      {event.poster_url ? (
        <img src={event.poster_url} alt={event.title} className="poster" />
      ) : (
        <div className={styles.placeholderPoster}>
          <span>🌱</span>
        </div>
      )}

      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <h3 className={styles.title}>{event.title}</h3>
          {event.modality && (
            <span className={`chip ${modalityClass}`}>{event.modality}</span>
          )}
        </div>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            📅 {fmtDate(event.start_datetime)}
          </div>
          <div className={styles.metaItem}>
            ⏰ {fmtTime(event.start_datetime, event.timezone)}
          </div>
          {event.country && (
            <div className={styles.metaItem}>
              🌍 {event.country}
            </div>
          )}
        </div>

        {event.organizer_name && (
          <div className={styles.organizer}>
            By {event.organizer_name}
          </div>
        )}

        {event.summary && (
          <p className={styles.summary}>{event.summary.substring(0, 120)}...</p>
        )}

        <div className={styles.cardFooter}>
          <span className="btn-text">View Details →</span>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;

