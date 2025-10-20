import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useStore } from '../app/store';
import EventCard from '../components/EventCard/EventCard';
import EventDrawer from '../components/EventDrawer/EventDrawer';
import Filters from '../components/Filters/Filters';
import Icons from '../components/Icons/Icons';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './MapGallery.module.css';

function MapGallery() {
  const getFilteredEvents = useStore((state) => state.getFilteredEvents);
  const filters = useStore((state) => state.filters); // Track filters directly
  const loading = useStore((state) => state.loading);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]); // Store markers for cleanup

  // Get filtered events and memoize them
  const filteredEvents = useMemo(() => getFilteredEvents(), [
    filters.q,
    filters.country,
    filters.category,
    filters.modality,
    filters.topics,
    filters.tags,
    filters.dateFrom,
    filters.dateTo,
    filters.campaign,
  ]);
  
  // Filter events that have location data
  const eventsWithLocation = useMemo(() => 
    filteredEvents.filter(
      (e) => e.latitude && e.longitude && !isNaN(e.latitude) && !isNaN(e.longitude)
    ),
    [filteredEvents]
  );

  // Initialize map once
  useEffect(() => {
    if (loading || !mapContainer.current || map.current) return;

    // Initialize map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [100, 15], // Center on Asia
      zoom: 3,
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [loading]);

  // Update markers when filtered events change
  useEffect(() => {
    if (!map.current || loading) return;

    // Remove old markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    if (eventsWithLocation.length === 0) {
      // Reset map view if no events
      map.current.flyTo({
        center: [100, 15],
        zoom: 3,
        duration: 1000
      });
      return;
    }

    // Add new markers
    eventsWithLocation.forEach((event) => {
      const el = document.createElement('div');
      el.className = styles.marker;
      el.style.cursor = 'pointer';
      
      // Create a custom marker element with icon
      el.innerHTML = `
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--zw-blue);
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: transform 0.2s ease;
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      `;

      el.addEventListener('mouseenter', () => {
        el.firstElementChild.style.transform = 'scale(1.3)';
        el.firstElementChild.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
      });

      el.addEventListener('mouseleave', () => {
        el.firstElementChild.style.transform = 'scale(1)';
        el.firstElementChild.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
      });

      el.addEventListener('click', () => {
        setSelectedEvent(event);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([parseFloat(event.longitude), parseFloat(event.latitude)])
        .setPopup(
          new maplibregl.Popup({ 
            offset: 25,
            closeButton: false,
          }).setHTML(
            `<div style="padding: 12px; max-width: 200px;">
              <strong style="color: var(--zw-blue); display: block; margin-bottom: 4px;">${event.title}</strong>
              <div style="color: var(--ink-600); font-size: 0.85rem; display: flex; align-items: center; gap: 4px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                ${event.city || event.country || 'Location'}
              </div>
            </div>`
          )
        )
        .addTo(map.current);

      markers.current.push(marker);
    });

    // Fit map to show all markers
    if (eventsWithLocation.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      eventsWithLocation.forEach((event) => {
        bounds.extend([parseFloat(event.longitude), parseFloat(event.latitude)]);
      });
      
      map.current.fitBounds(bounds, {
        padding: { top: 80, bottom: 80, left: 80, right: 80 },
        maxZoom: 10,
        duration: 1000,
      });
    }
  }, [eventsWithLocation, loading]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="loading">
          <Icons.Map size={48} />
          <p>Loading map and events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mapGallery}>
      <div className="container">
        <header className={styles.pageHeader}>
          <div>
            <h1 className="h1"><Icons.Map size={36} /> Event Map & Gallery</h1>
            <p className="lead">Explore events on the map and browse the gallery</p>
          </div>
          <div className={styles.statsContainer}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{filteredEvents.length}</span>
              <span className={styles.statLabel}>Total Events</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{eventsWithLocation.length}</span>
              <span className={styles.statLabel}>On Map</span>
            </div>
          </div>
        </header>

        <div className={styles.mapSection}>
          <div ref={mapContainer} className={styles.mapContainer} />
          <div className={styles.mapInfo}>
            <Icons.MapPin size={18} /> {eventsWithLocation.length} events with location data
          </div>
        </div>

        <div className={styles.contentGrid}>
          <aside className={styles.sidebar}>
            <Filters compact={false} />
          </aside>

          <div className={styles.gallery}>
            <div className={styles.galleryHeader}>
              <h2 className="h2">Event Gallery</h2>
              <span className={styles.count}>
                {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
              </span>
            </div>

            {filteredEvents.length === 0 ? (
              <div className={styles.noResults}>
                <Icons.Search size={48} />
                <h3>No events found</h3>
                <p className={styles.noResultsHint}>Try adjusting your search criteria or clearing filters.</p>
              </div>
            ) : (
              <div className={styles.galleryGrid}>
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={(evt) => setSelectedEvent(evt)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <EventDrawer event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}

export default MapGallery;
