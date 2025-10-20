import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { adminPublishEvent, adminArchiveEvent, notifyMailer } from '../../services/apiSupabase';
import Icons from '../../components/Icons/Icons';
import MapPicker from '../../components/MapPicker/MapPicker';
import styles from './AdminEventEdit.module.css';

function AdminEventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    setLoading(true);
    try {
      // Load event
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (eventError) throw eventError;
      setEvent(eventData);

      // Load reference data
      const [categoriesRes, topicsRes, campaignsRes] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('topics').select('*').order('name'),
        supabase.from('campaigns').select('*').order('title'),
      ]);

      setCategories(categoriesRes.data || []);
      setTopics(topicsRes.data || []);
      setCampaigns(campaignsRes.data || []);
    } catch (error) {
      console.error('Failed to load event:', error);
      alert('Failed to load event: ' + error.message);
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('events')
        .update({
          title: event.title,
          summary: event.summary,
          description: event.description,
          start_datetime: event.start_datetime,
          end_datetime: event.end_datetime,
          timezone: event.timezone,
          modality: event.modality,
          country_code: event.country_code,
          city: event.city,
          venue_name: event.venue_name,
          address: event.address,
          latitude: event.latitude,
          longitude: event.longitude,
          registration_url: event.registration_url,
          livestream_url: event.livestream_url,
          organizer_name: event.organizer_name,
          contact_person: event.contact_person,
          contact_email: event.contact_email,
          contact_phone: event.contact_phone,
          category_id: event.category_id,
          cover_image_url: event.cover_image_url,
          status: event.status,
        })
        .eq('id', id);

      if (error) throw error;

      alert('Event updated successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save event: ' + error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (!confirm(`Publish "${event.title}"? This will send an email to the organizer.`)) {
      return;
    }

    setSaving(true);
    try {
      const updatedEvent = await adminPublishEvent(id);
      await notifyMailer('published', updatedEvent);
      
      alert('Event published successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Publish failed:', error);
      alert('Failed to publish: ' + error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleArchive() {
    if (!confirm(`Archive "${event.title}"?`)) {
      return;
    }

    setSaving(true);
    try {
      await adminArchiveEvent(id);
      alert('Event archived successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Archive failed:', error);
      alert('Failed to archive: ' + error.message);
    } finally {
      setSaving(false);
    }
  }

  function handleChange(field, value) {
    setEvent({ ...event, [field]: value });
  }

  function handleMapChange(mapData) {
    setEvent({
      ...event,
      latitude: mapData.latitude || null,
      longitude: mapData.longitude || null,
      ...(mapData.city && { city: mapData.city }),
      ...(mapData.country_code && { country_code: mapData.country_code }),
      ...(mapData.address && { address: mapData.address }),
    });
  }

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <Icons.Clock size={48} />
        <p>Loading event...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className={styles.errorState}>
        <Icons.X size={48} />
        <h2>Event Not Found</h2>
        <button onClick={() => navigate('/admin')} className="btn btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className={styles.adminEventEdit}>
      <header className={styles.pageHeader}>
        <div>
          <button onClick={() => navigate('/admin')} className={styles.backButton}>
            <Icons.ChevronLeft size={20} />
            Back to Events
          </button>
          <h1 className={styles.pageTitle}>
            <Icons.Edit size={32} />
            Edit Event
          </h1>
          <div className={styles.statusBadge} data-status={event.status}>
            {event.status.replace('_', ' ')}
          </div>
        </div>

        <div className={styles.quickActions}>
          {event.status === 'under_review' && (
            <button
              onClick={handlePublish}
              disabled={saving}
              className="btn btn-primary"
            >
              <Icons.CalendarCheck size={20} />
              Publish Event
            </button>
          )}

          {event.status === 'published' && (
            <button
              onClick={handleArchive}
              disabled={saving}
              className="btn btn-outline"
            >
              <Icons.Archive size={20} />
              Archive Event
            </button>
          )}
        </div>
      </header>

      <form onSubmit={handleSave} className={styles.editForm}>
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Basic Information</h2>

          <div className={styles.formGroup}>
            <label htmlFor="title">Event Title *</label>
            <input
              id="title"
              type="text"
              value={event.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="summary">Summary</label>
            <textarea
              id="summary"
              value={event.summary || ''}
              onChange={(e) => handleChange('summary', e.target.value)}
              rows="3"
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Full Description</label>
            <textarea
              id="description"
              value={event.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              rows="6"
              className={styles.textarea}
            />
          </div>
        </section>

        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Date & Time</h2>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="start_datetime">Start Date & Time *</label>
              <input
                id="start_datetime"
                type="datetime-local"
                value={event.start_datetime?.slice(0, 16) || ''}
                onChange={(e) => handleChange('start_datetime', e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="end_datetime">End Date & Time *</label>
              <input
                id="end_datetime"
                type="datetime-local"
                value={event.end_datetime?.slice(0, 16) || ''}
                onChange={(e) => handleChange('end_datetime', e.target.value)}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="timezone">Timezone *</label>
            <input
              id="timezone"
              type="text"
              value={event.timezone || ''}
              onChange={(e) => handleChange('timezone', e.target.value)}
              required
              placeholder="e.g., Asia/Manila"
              className={styles.input}
            />
          </div>
        </section>

        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Location & Modality</h2>

          <div className={styles.formGroup}>
            <label>Modality *</label>
            <div className={styles.radioGroup}>
              {['in_person', 'online', 'hybrid'].map((mod) => (
                <label key={mod} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="modality"
                    value={mod}
                    checked={event.modality === mod}
                    onChange={(e) => handleChange('modality', e.target.value)}
                    required
                  />
                  <span>{mod.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          {event.modality !== 'online' && (
            <>
              <div className={styles.formGroup}>
                <label>Location on Map</label>
                <MapPicker
                  value={{
                    latitude: event.latitude ? parseFloat(event.latitude) : null,
                    longitude: event.longitude ? parseFloat(event.longitude) : null,
                  }}
                  onChange={handleMapChange}
                  height="320px"
                  reverseGeocode={true}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    value={event.city || ''}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="country_code">Country Code</label>
                  <input
                    id="country_code"
                    type="text"
                    value={event.country_code || ''}
                    onChange={(e) => handleChange('country_code', e.target.value.toUpperCase())}
                    maxLength="2"
                    placeholder="PH"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="venue_name">Venue Name</label>
                <input
                  id="venue_name"
                  type="text"
                  value={event.venue_name || ''}
                  onChange={(e) => handleChange('venue_name', e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  value={event.address || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  rows="2"
                  className={styles.textarea}
                />
              </div>
            </>
          )}
        </section>

        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Organizer & Contact</h2>

          <div className={styles.formGroup}>
            <label htmlFor="organizer_name">Organizer Name *</label>
            <input
              id="organizer_name"
              type="text"
              value={event.organizer_name || ''}
              onChange={(e) => handleChange('organizer_name', e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="contact_person">Contact Person *</label>
              <input
                id="contact_person"
                type="text"
                value={event.contact_person || ''}
                onChange={(e) => handleChange('contact_person', e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contact_email">Contact Email *</label>
              <input
                id="contact_email"
                type="email"
                value={event.contact_email || ''}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact_phone">Contact Phone</label>
            <input
              id="contact_phone"
              type="tel"
              value={event.contact_phone || ''}
              onChange={(e) => handleChange('contact_phone', e.target.value)}
              className={styles.input}
            />
          </div>
        </section>

        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Category & Media</h2>

          <div className={styles.formGroup}>
            <label htmlFor="category_id">Category</label>
            <select
              id="category_id"
              value={event.category_id || ''}
              onChange={(e) => handleChange('category_id', e.target.value || null)}
              className={styles.select}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cover_image_url">Cover Image URL</label>
            <input
              id="cover_image_url"
              type="url"
              value={event.cover_image_url || ''}
              onChange={(e) => handleChange('cover_image_url', e.target.value)}
              placeholder="https://..."
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="registration_url">Registration URL</label>
            <input
              id="registration_url"
              type="url"
              value={event.registration_url || ''}
              onChange={(e) => handleChange('registration_url', e.target.value)}
              placeholder="https://..."
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="livestream_url">Livestream URL</label>
            <input
              id="livestream_url"
              type="url"
              value={event.livestream_url || ''}
              onChange={(e) => handleChange('livestream_url', e.target.value)}
              placeholder="https://..."
              className={styles.input}
            />
          </div>
        </section>

        <div className={styles.formActions}>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="btn btn-outline"
            disabled={saving}
          >
            Cancel
          </button>

          <button type="submit" className="btn btn-primary" disabled={saving}>
            <Icons.CalendarCheck size={20} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminEventEdit;

