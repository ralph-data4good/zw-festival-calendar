import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../app/store';
import EventCard from '../components/EventCard/EventCard';
import EventDrawer from '../components/EventDrawer/EventDrawer';
import Icons from '../components/Icons/Icons';
import styles from './Home.module.css';

function Home() {
  const events = useStore((state) => state.events);
  const campaigns = useStore((state) => state.campaigns);
  const loading = useStore((state) => state.loading);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get events happening this week (next 7 days)
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const thisWeekEvents = events
    .filter((e) => {
      const eventDate = new Date(e.start_datetime);
      return eventDate >= today && eventDate <= nextWeek;
    })
    .sort((a, b) => new Date(a.start_datetime) - new Date(b.start_datetime))
    .slice(0, 6);

  // Get ongoing and upcoming featured campaigns (key moments)
  const featuredCampaigns = campaigns
    .filter(c => c.featured)
    .map(c => ({
      ...c,
      startDate: new Date(c.start_date),
      endDate: new Date(c.end_date),
      isOngoing: new Date(c.start_date) <= today && new Date(c.end_date) >= today,
      isUpcoming: new Date(c.start_date) > today,
    }))
    .filter(c => c.endDate >= today); // Campaign hasn't ended yet

  // Get ongoing campaign (currently active)
  const ongoingCampaign = featuredCampaigns
    .filter(c => c.isOngoing)
    .sort((a, b) => a.startDate - b.startDate)[0];

  // Get upcoming campaign (next to start)
  const upcomingCampaign = featuredCampaigns
    .filter(c => c.isUpcoming)
    .sort((a, b) => a.startDate - b.startDate)[0];

  // Get events for ongoing campaign
  const ongoingCampaignEvents = ongoingCampaign
    ? events
        .filter((e) => e.campaign_id === ongoingCampaign.id)
        .sort((a, b) => new Date(a.start_datetime) - new Date(b.start_datetime))
        .slice(0, 6)
    : [];

  // Get events for upcoming campaign
  const upcomingCampaignEvents = upcomingCampaign
    ? events
        .filter((e) => e.campaign_id === upcomingCampaign.id)
        .sort((a, b) => new Date(a.start_datetime) - new Date(b.start_datetime))
        .slice(0, 6)
    : [];

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Celebrate Zero Waste, Together.
              </h1>
              <p className={styles.heroSubtitle}>
                Discover, register, and map activities across Asia that advance zero-waste solutions.
              </p>
              <div className={styles.heroCta}>
                <Link to="/register" className="btn btn-primary">
                  <Icons.Plus size={20} /> Add Your Event
                </Link>
                <Link to="/calendar" className="btn btn-outline">
                  <Icons.Calendar size={20} /> Explore Calendar
                </Link>
                <Link to="/map" className="btn btn-outline">
                  <Icons.Map size={20} /> View Map
                </Link>
              </div>
            </div>

            <div className={styles.heroPanel}>
              <h3 className={styles.panelTitle}>Quick Stats</h3>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <div className={styles.statValue}>{events.length}</div>
                  <div className={styles.statLabel}>Total Events</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statValue}>{thisWeekEvents.length}</div>
                  <div className={styles.statLabel}>This Week</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statValue}>
                    {[...new Set(events.map((e) => e.country))].length}
                  </div>
                  <div className={styles.statLabel}>Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className="container">
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={styles.stepNumber}><Icons.Edit size={24} /></div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Add Your Event</h3>
                <p className={styles.stepDescription}>
                  Share your zero waste activities with our community
                </p>
                <Link to="/register" className={styles.stepLink}>
                  Register Now <Icons.ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}><Icons.Calendar size={24} /></div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Explore the Calendar</h3>
                <p className={styles.stepDescription}>
                  Find events happening near you or online
                </p>
                <Link to="/calendar" className={styles.stepLink}>
                  Browse Events <Icons.ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}><Icons.Filter size={24} /></div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Filter & Subscribe</h3>
                <p className={styles.stepDescription}>
                  Get updates on topics that matter to you
                </p>
                <Link to="/calendar" className={styles.stepLink}>
                  Start Filtering <Icons.ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.eventsSection}>
        <div className="container">

          {thisWeekEvents.length > 0 && (
            <div className={styles.eventBlock}>
              <div className={styles.sectionHeader}>
                <h2 className="h2"><Icons.Clock size={28} /> Happening This Week</h2>
                <Link to="/calendar" className="btn-text">
                  View All <Icons.ChevronRight size={16} />
                </Link>
              </div>
              <div className="grid grid-3">
                {thisWeekEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={(evt) => setSelectedEvent(evt)}
                  />
                ))}
              </div>
            </div>
          )}

          {ongoingCampaign && ongoingCampaignEvents.length > 0 && (
            <div className={styles.eventBlock}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2 className="h2">
                    <span style={{ fontSize: '28px', marginRight: '8px' }}>{ongoingCampaign.emoji}</span>
                    In Focus: {ongoingCampaign.name}
                  </h2>
                  <p className={styles.campaignDescription}>
                    {ongoingCampaign.description}
                  </p>
                </div>
                <Link 
                  to={`/calendar?campaign=${ongoingCampaign.id}`} 
                  className="btn-text"
                >
                  View All <Icons.ChevronRight size={16} />
                </Link>
              </div>
              <div className="grid grid-3">
                {ongoingCampaignEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={(evt) => setSelectedEvent(evt)}
                  />
                ))}
              </div>
            </div>
          )}

          {upcomingCampaign && upcomingCampaignEvents.length > 0 && (
            <div className={styles.eventBlock}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2 className="h2">
                    <span style={{ fontSize: '28px', marginRight: '8px' }}>{upcomingCampaign.emoji}</span>
                    In Focus: {upcomingCampaign.name}
                  </h2>
                  <p className={styles.campaignDescription}>
                    {upcomingCampaign.description}
                  </p>
                </div>
                <Link 
                  to={`/calendar?campaign=${upcomingCampaign.id}`} 
                  className="btn-text"
                >
                  View All <Icons.ChevronRight size={16} />
                </Link>
              </div>
              <div className="grid grid-3">
                {upcomingCampaignEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={(evt) => setSelectedEvent(evt)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <EventDrawer event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}

export default Home;
