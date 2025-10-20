import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../app/store';
import { fmtRange, getUserTimezone } from '../utils/date';
import { downloadICS } from '../services/ics';
import Icons from '../components/Icons/Icons';
import styles from './EventDetail.module.css';

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const events = useStore((state) => state.events);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const foundEvent = events.find((e) => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
    }
  }, [id, events]);

  if (!event) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h1 className="h1">Event not found</h1>
        <p className="lead">The event you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleDownloadICS = () => {
    downloadICS(event);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const modalityClass = event.modality?.toLowerCase().replace(' ', '') || '';
  const userTz = getUserTimezone();

  return (
    <div className={styles.eventDetail}>
      <div className="container">
        <button 
          type="button"
          onClick={() => navigate(-1)} 
          className={styles.backBtn}
        >
          ← Back
        </button>

        <div className={styles.hero}>
          {event.poster_url && (
            <img src={event.poster_url} alt={event.title} className={styles.heroImage} />
          )}

          <div className={styles.heroContent}>
            <div className={styles.header}>
              <h1 className="h1">{event.title}</h1>
              {event.modality && <span className={`chip ${modalityClass}`}>{event.modality}</span>}
            </div>

            <div className={styles.quickInfo}>
              <div className={styles.infoItem}>
                <strong><Icons.Calendar size={18} /> Date & Time:</strong>
                <div>{fmtRange(event.start_datetime, event.end_datetime, event.timezone)}</div>
                {event.timezone !== userTz && (
                  <div className={styles.localTime}>
                    Your local time: {fmtRange(event.start_datetime, event.end_datetime, userTz)}
                  </div>
                )}
              </div>

              {event.country && (
                <div className={styles.infoItem}>
                  <strong>🌍 Location:</strong> {event.country}
                  {event.city && `, ${event.city}`}
                </div>
              )}

              {event.venue_name && (
                <div className={styles.infoItem}>
                  <strong><Icons.MapPin size={18} /> Venue:</strong> {event.venue_name}
                </div>
              )}

              {event.address && (
                <div className={styles.infoItem}>
                  <strong><Icons.Building size={18} /> Address:</strong> {event.address}
                </div>
              )}

              {event.organizer_name && (
                <div className={styles.infoItem}>
                  <strong><Icons.Users size={18} /> Organizer:</strong> {event.organizer_name}
                </div>
              )}
            </div>

            <div className={styles.actions}>
              <button 
                type="button"
                className="btn btn-primary" 
                onClick={handleDownloadICS}
              >
                <Icons.Download size={20} /> Add to Calendar
              </button>
              {event.registration_url && (
                <a
                  href={event.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Register Now →
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.mainContent}>
            {event.summary && (
              <section className={styles.section}>
                <h2 className="h2">About This Event</h2>
                <p className={styles.summary}>{event.summary}</p>
              </section>
            )}

            {event.description && (
              <section className={styles.section}>
                <h2 className="h2">Details</h2>
                <div className={styles.description}>
                  {event.description.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            )}

            {event.latitude && event.longitude && (
              <section className={styles.section}>
                <h2 className="h2"><Icons.MapPin size={28} /> Location Map</h2>
                <div className={styles.mapPlaceholder}>
                  <p>
                    <Icons.MapPin size={16} /> {event.latitude.toFixed(4)}, {event.longitude.toFixed(4)}
                  </p>
                  <a
                    href={`https://www.google.com/maps?q=${event.latitude},${event.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </section>
            )}
          </div>

          <aside className={styles.sidebar}>
            {event.topics && event.topics.length > 0 && (
              <div className={styles.sidebarSection}>
                <h3><Icons.Tag size={20} /> Topics</h3>
                <div className="chips">
                  {event.topics.map((topic) => (
                    <span key={topic} className="chip">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {event.tags && event.tags.length > 0 && (
              <div className={styles.sidebarSection}>
                <h3><Icons.Tag size={20} /> Tags</h3>
                <div className="chips">
                  {event.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {event.category && (
              <div className={styles.sidebarSection}>
                <h3><Icons.Folder size={20} /> Category</h3>
                <p>{event.category}</p>
              </div>
            )}

            {event.partners && event.partners.length > 0 && (
              <div className={styles.sidebarSection}>
                <h3>🤝 Partners</h3>
                <div className={styles.partnersList}>
                  {event.partners.map((partner, i) => (
                    <div key={i} className={styles.partner}>
                      {partner.website ? (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.partnerLink}
                        >
                          {partner.name}
                        </a>
                      ) : (
                        <span>{partner.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.sidebarSection}>
              <h3><Icons.ExternalLink size={20} /> Share</h3>
              <div className={styles.shareButtons}>
                <button
                  type="button"
                  className={styles.shareBtn}
                  onClick={handleShare}
                >
                  <Icons.Link size={18} /> Copy Link
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
