import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './MapPicker.module.css';

/**
 * MapPicker Component
 * 
 * Interactive map for selecting event location with automatic reverse geocoding.
 * 
 * Props:
 * - value: { latitude: number|null, longitude: number|null }
 * - onChange: (data) => void  // emits { latitude, longitude, address?, city?, country? }
 * - disabled: boolean
 * - height: CSS length (default '360px')
 * - reverseGeocode: boolean (default true)
 * - initialCenter: [lng, lat] (default [121.0, 14.6] ~ Manila)
 * - initialZoom: number (default 4.5)
 * 
 * Behavior:
 * - Click map → place/move marker, update coordinates
 * - Optional reverse-geocode via Nominatim to auto-fill address details
 * - Marker syncs with external value changes
 * 
 * Accessibility:
 * - Focusable container with keyboard support
 * - ARIA labels for screen readers
 * - Visible attribution preserved
 */
function MapPicker({
  value,
  onChange,
  disabled = false,
  height = '360px',
  reverseGeocode = true,
  initialCenter = [121.0, 14.6],
  initialZoom = 4.5,
}) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const containerRef = useRef(null);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current) return;

    // Minimal raster style using OpenStreetMap tiles
    const style = {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
        },
      },
      layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
    };

    const map = new maplibregl.Map({
      container: containerRef.current,
      style,
      center:
        value?.longitude && value?.latitude
          ? [value.longitude, value.latitude]
          : initialCenter,
      zoom: value?.latitude ? 12 : initialZoom,
      attributionControl: true,
    });
    mapRef.current = map;

    // Add navigation controls
    map.addControl(
      new maplibregl.NavigationControl({ visualizePitch: false }),
      'top-right'
    );

    // If external value was already set, show a marker
    if (value?.latitude && value?.longitude) {
      markerRef.current = new maplibregl.Marker({ color: '#4A8FC7' }) // Use brand blue
        .setLngLat([value.longitude, value.latitude])
        .addTo(map);
    }

    // Handle map clicks
    function handleClick(e) {
      if (disabled) return;
      const { lng, lat } = e.lngLat;

      // Create or update marker
      if (!markerRef.current) {
        markerRef.current = new maplibregl.Marker({ color: '#4A8FC7' })
          .setLngLat([lng, lat])
          .addTo(map);
      } else {
        markerRef.current.setLngLat([lng, lat]);
      }

      // If reverse geocoding is disabled, just return coordinates
      if (!reverseGeocode) {
        onChange?.({ latitude: lat, longitude: lng });
        return;
      }

      // Reverse-geocode via Nominatim (rate-limited; OK for MVP)
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`,
        { 
          headers: { 
            'Accept-Language': 'en',
            'User-Agent': 'ZeroWasteFestival/1.0' // Nominatim requires user agent
          } 
        }
      )
        .then((r) => (r.ok ? r.json() : null))
        .then((json) => {
          const addr = json?.address || {};
          const city =
            addr.city || 
            addr.town || 
            addr.village || 
            addr.municipality || 
            addr.county || '';
          const country = addr.country || '';
          const address = json?.display_name || '';

          onChange?.({
            latitude: lat,
            longitude: lng,
            city,
            country,
            address,
          });
        })
        .catch((err) => {
          console.error('Reverse geocoding failed:', err);
          // Still return coordinates even if geocoding fails
          onChange?.({ latitude: lat, longitude: lng });
        });
    }

    map.on('click', handleClick);

    // Cleanup
    return () => {
      map.off('click', handleClick);
      if (markerRef.current) {
        markerRef.current.remove();
      }
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, reverseGeocode]);

  // Keep marker synced with external value changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !value) return;

    if (value.latitude && value.longitude) {
      if (!markerRef.current) {
        markerRef.current = new maplibregl.Marker({ color: '#4A8FC7' })
          .setLngLat([value.longitude, value.latitude])
          .addTo(map);
      } else {
        markerRef.current.setLngLat([value.longitude, value.latitude]);
      }
      
      // Center map on marker
      map.flyTo({
        center: [value.longitude, value.latitude],
        zoom: 12,
        duration: 1000,
      });
    }
  }, [value]);

  return (
    <div className={styles.mapPickerWrapper}>
      <div
        ref={containerRef}
        className={`${styles.mapContainer} ${disabled ? styles.disabled : ''}`}
        style={{ height }}
        tabIndex={0}
        role="application"
        aria-label="Event location map. Click on the map to drop a pin and select your event location."
      />
      {disabled && (
        <div className={styles.disabledOverlay}>
          <p>Map disabled for online events</p>
        </div>
      )}
      <div className={styles.hint}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        Click on the map to place a pin at your event location
      </div>
    </div>
  );
}

export default MapPicker;

