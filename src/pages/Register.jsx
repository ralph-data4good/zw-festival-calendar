import React, { useState } from 'react';
import { useStore } from '../app/store';
import Icons from '../components/Icons/Icons';
import MapPicker from '../components/MapPicker/MapPicker';
import styles from './Register.module.css';

function Register() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1
    title: '',
    modality: 'In-person',
    country: '',
    city: '',
    venue_name: '',
    address: '',
    latitude: '',
    longitude: '',
    // Step 2
    start_datetime: '',
    end_datetime: '',
    timezone: 'Asia/Manila',
    category: '',
    topics: [],
    tags: '',
    summary: '',
    description: '',
    poster_url: '',
    registration_url: '',
    organizer_name: '',
    organizer_email: '',
    partners: [{ name: '', logo: '', website: '' }],
    campaign_ids: [],
    languages: '',
    accessibility_features: '',
    target_audience: '',
    consent_accurate: false,
    consent_promotional: false,
    consent_privacy: false,
  });

  const categories = useStore((state) => state.categories);
  const topics = useStore((state) => state.topics);
  const campaigns = useStore((state) => state.campaigns);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTopicToggle = (topicId) => {
    const current = formData.topics;
    if (current.includes(topicId)) {
      setFormData({ ...formData, topics: current.filter((t) => t !== topicId) });
    } else {
      setFormData({ ...formData, topics: [...current, topicId] });
    }
  };

  const handleCampaignToggle = (campaignId) => {
    const current = formData.campaign_ids;
    if (current.includes(campaignId)) {
      setFormData({ ...formData, campaign_ids: current.filter((c) => c !== campaignId) });
    } else {
      setFormData({ ...formData, campaign_ids: [...current, campaignId] });
    }
  };

  const handleConsentChange = (consentName) => {
    setFormData({ ...formData, [consentName]: !formData[consentName] });
  };

  const handleAddPartner = () => {
    setFormData({
      ...formData,
      partners: [...formData.partners, { name: '', logo: '', website: '' }],
    });
  };

  const handleRemovePartner = (index) => {
    const newPartners = formData.partners.filter((_, i) => i !== index);
    setFormData({ ...formData, partners: newPartners });
  };

  const handlePartnerChange = (index, field, value) => {
    const newPartners = [...formData.partners];
    newPartners[index][field] = value;
    setFormData({ ...formData, partners: newPartners });
  };

  const handleMapChange = (mapData) => {
    // Receives { latitude, longitude, address?, city?, country? }
    setFormData((prev) => ({
      ...prev,
      latitude: mapData.latitude || '',
      longitude: mapData.longitude || '',
      ...(mapData.city && { city: mapData.city }),
      ...(mapData.country && { country: mapData.country }),
      ...(mapData.address && { address: mapData.address }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate consents
    if (!formData.consent_accurate || !formData.consent_promotional || !formData.consent_privacy) {
      alert('Please accept all required consents before submitting.');
      return;
    }
    
    // Create event object
    const eventData = {
      id: `evt-${Date.now()}`,
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      campaign_id: formData.campaign_ids.length > 0 ? formData.campaign_ids[0] : null, // Primary campaign
      created_at: new Date().toISOString(),
    };

    // For MVP: Download JSON
    const blob = new Blob([JSON.stringify(eventData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `event-${eventData.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    setSubmitted(true);
  };

  const requiresLocation = formData.modality === 'In-person' || formData.modality === 'Hybrid';
  
  const canProceedToStep2 = 
    formData.title && 
    formData.modality && 
    formData.country &&
    // For in-person/hybrid, require map pin and address
    (!requiresLocation || (formData.latitude && formData.longitude && formData.address));

  if (submitted) {
    return (
      <div className={styles.register}>
        <div className="container">
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✅</div>
            <h1 className="h1">Event Submitted!</h1>
            <p className="lead">
              Thank you for submitting your event. Your event data has been downloaded as a JSON
              file.
            </p>
            <p>
              Our team will review it and add it to the festival calendar shortly. You'll receive a
              confirmation email at <strong>{formData.organizer_email}</strong>.
            </p>
            <div className={styles.successActions}>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                Submit Another Event
              </button>
              <a href="/" className="btn btn-outline">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.register}>
      <div className="container">
        <header className="page-header">
          <h1 className="h1"><Icons.Edit size={36} /> Register Your Event</h1>
          <p>Share your zero waste event with the community</p>
        </header>

        <div className={styles.stepIndicator}>
          <div className={`${styles.stepItem} ${step >= 1 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepLabel}>Location & Type</div>
          </div>
          <div className={styles.stepLine}></div>
          <div className={`${styles.stepItem} ${step >= 2 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepLabel}>Details & Media</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {step === 1 && (
            <div className={styles.formSection}>
              <h2 className="h2">Step 1: Location & Modality</h2>

              <div className={styles.formGroup}>
                <label htmlFor="title">
                  Event Title <span className={styles.required}>*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Community Zero Waste Workshop"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="modality">
                  Modality <span className={styles.required}>*</span>
                </label>
                <select
                  id="modality"
                  name="modality"
                  value={formData.modality}
                  onChange={handleChange}
                  required
                  className={styles.select}
                >
                  <option value="In-person">In-person</option>
                  <option value="Online">Online</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="country">
                    Country <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Philippines"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., Manila"
                    className={styles.input}
                  />
                </div>
              </div>

              {formData.modality !== 'Online' && (
                <>
                  <div className={styles.formGroup}>
                    <label htmlFor="venue_name">Venue Name</label>
                    <input
                      id="venue_name"
                      name="venue_name"
                      type="text"
                      value={formData.venue_name}
                      onChange={handleChange}
                      placeholder="e.g., Community Center Hall"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      Event Location on Map <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.helpText}>
                      Click on the map to pin your event location. The address will be auto-filled (editable).
                    </p>
                    <MapPicker
                      value={{ 
                        latitude: formData.latitude ? parseFloat(formData.latitude) : null, 
                        longitude: formData.longitude ? parseFloat(formData.longitude) : null 
                      }}
                      onChange={handleMapChange}
                      disabled={false}
                      height="360px"
                      reverseGeocode={true}
                      initialCenter={[121.0, 14.6]} // Manila
                      initialZoom={4.5}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="latitude">Latitude</label>
                      <input
                        id="latitude"
                        name="latitude"
                        type="number"
                        step="any"
                        value={formData.latitude}
                        onChange={handleChange}
                        placeholder="14.5995"
                        className={styles.input}
                        readOnly
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="longitude">Longitude</label>
                      <input
                        id="longitude"
                        name="longitude"
                        type="number"
                        step="any"
                        value={formData.longitude}
                        onChange={handleChange}
                        placeholder="120.9842"
                        className={styles.input}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="address">
                      Full Address <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="2"
                      placeholder="Street address (auto-filled from map, editable)"
                      className={styles.textarea}
                      required
                    />
                  </div>
                </>
              )}

              {requiresLocation && (!formData.latitude || !formData.longitude || !formData.address) && (
                <div className={styles.validationHint}>
                  <Icons.MapPin size={18} color="var(--accent-gold)" />
                  <span>
                    <strong>Location Required:</strong> Please click on the map to pin your event location. 
                    The address will be auto-filled and can be edited.
                  </span>
                </div>
              )}

              <div className={styles.formActions}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                >
                  Next: Details & Media →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.formSection}>
              <h2 className="h2">Step 2: Details & Media</h2>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="start_datetime">
                    Start Date & Time <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="start_datetime"
                    name="start_datetime"
                    type="datetime-local"
                    value={formData.start_datetime}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="end_datetime">
                    End Date & Time <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="end_datetime"
                    name="end_datetime"
                    type="datetime-local"
                    value={formData.end_datetime}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="timezone">Timezone</label>
                <input
                  id="timezone"
                  name="timezone"
                  type="text"
                  value={formData.timezone}
                  onChange={handleChange}
                  placeholder="e.g., Asia/Manila"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Topics (select all that apply)</label>
                <div className={styles.topicsList}>
                  {topics.map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      className={`chip ${formData.topics.includes(topic.id) ? 'active' : ''}`}
                      onClick={() => handleTopicToggle(topic.id)}
                    >
                      {topic.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="tags">Tags (comma separated)</label>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., cleanup, workshop, youth"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="summary">
                  Short Summary <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Brief description (1-2 sentences)"
                  className={styles.textarea}
                  maxLength="200"
                />
                <div className={styles.charCount}>{formData.summary.length}/200</div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Full Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Detailed event description, agenda, what to bring, etc."
                  className={styles.textarea}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="poster_url">Poster/Image URL</label>
                <input
                  id="poster_url"
                  name="poster_url"
                  type="url"
                  value={formData.poster_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="registration_url">Registration URL</label>
                <input
                  id="registration_url"
                  name="registration_url"
                  type="url"
                  value={formData.registration_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className={styles.input}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="organizer_name">
                    Organizer Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="organizer_name"
                    name="organizer_name"
                    type="text"
                    value={formData.organizer_name}
                    onChange={handleChange}
                    required
                    placeholder="Your name or organization"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="organizer_email">
                    Organizer Email <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="organizer_email"
                    name="organizer_email"
                    type="email"
                    value={formData.organizer_email}
                    onChange={handleChange}
                    required
                    placeholder="contact@example.com"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Partners (optional)</label>
                {formData.partners.map((partner, index) => (
                  <div key={index} className={styles.partnerRow}>
                    <input
                      type="text"
                      value={partner.name}
                      onChange={(e) => handlePartnerChange(index, 'name', e.target.value)}
                      placeholder="Partner name"
                      className={styles.input}
                    />
                    <input
                      type="url"
                      value={partner.logo}
                      onChange={(e) => handlePartnerChange(index, 'logo', e.target.value)}
                      placeholder="Logo URL"
                      className={styles.input}
                    />
                    <input
                      type="url"
                      value={partner.website}
                      onChange={(e) => handlePartnerChange(index, 'website', e.target.value)}
                      placeholder="Website URL"
                      className={styles.input}
                    />
                    {formData.partners.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePartner(index)}
                        className={styles.removeBtn}
                      >
                        <Icons.X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={handleAddPartner} className="btn-text">
                  + Add Partner
                </button>
              </div>

              <div className={styles.sectionDivider}>
                <Icons.Archive size={24} color="var(--zw-blue)" />
                <h3>Campaigns</h3>
              </div>

              <div className={styles.formGroup}>
                <label>Associated Campaigns</label>
                <p className={styles.helpText}>
                  Select campaigns this event is part of (optional)
                </p>
                <div className={styles.campaignsList}>
                  {campaigns.map((campaign) => (
                    <label key={campaign.id} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.campaign_ids.includes(campaign.id)}
                        onChange={() => handleCampaignToggle(campaign.id)}
                        className={styles.checkbox}
                      />
                      <span className={styles.checkboxText}>
                        {campaign.emoji} {campaign.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="languages">Languages</label>
                <input
                  id="languages"
                  name="languages"
                  type="text"
                  value={formData.languages}
                  onChange={handleChange}
                  placeholder="e.g., English, Filipino, Spanish"
                  className={styles.input}
                />
                <p className={styles.helpText}>
                  Comma-separated (e.g., English, Filipino, Spanish)
                </p>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="accessibility_features">Accessibility Features</label>
                <input
                  id="accessibility_features"
                  name="accessibility_features"
                  type="text"
                  value={formData.accessibility_features}
                  onChange={handleChange}
                  placeholder="e.g., Wheelchair accessible, Closed captions"
                  className={styles.input}
                />
                <p className={styles.helpText}>
                  Comma-separated (e.g., Wheelchair accessible, Sign language interpretation)
                </p>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="target_audience">Target Audience</label>
                <input
                  id="target_audience"
                  name="target_audience"
                  type="text"
                  value={formData.target_audience}
                  onChange={handleChange}
                  placeholder="e.g., Adults, Youth, Families"
                  className={styles.input}
                />
                <p className={styles.helpText}>
                  Comma-separated (e.g., Adults, Youth, Professionals)
                </p>
              </div>

              <div className={styles.sectionDivider}>
                <Icons.CalendarCheck size={24} color="var(--zw-blue)" />
                <h3>Required Consents</h3>
              </div>

              <div className={styles.consentsGroup}>
                <label className={styles.consentLabel}>
                  <input
                    type="checkbox"
                    checked={formData.consent_accurate}
                    onChange={() => handleConsentChange('consent_accurate')}
                    className={styles.consentCheckbox}
                    required
                  />
                  <span className={styles.consentText}>
                    <strong>I confirm that the information provided is accurate and complete to the best of my knowledge.</strong>
                  </span>
                </label>

                <label className={styles.consentLabel}>
                  <input
                    type="checkbox"
                    checked={formData.consent_promotional}
                    onChange={() => handleConsentChange('consent_promotional')}
                    className={styles.consentCheckbox}
                    required
                  />
                  <span className={styles.consentText}>
                    <strong>I grant permission for Zero Waste Festival to use event images and information for promotional purposes.</strong>
                  </span>
                </label>

                <label className={styles.consentLabel}>
                  <input
                    type="checkbox"
                    checked={formData.consent_privacy}
                    onChange={() => handleConsentChange('consent_privacy')}
                    className={styles.consentCheckbox}
                    required
                  />
                  <span className={styles.consentText}>
                    <strong>I have read and agree to the Privacy Policy and understand how my data will be used.</strong>
                  </span>
                </label>
              </div>

              <div className={styles.formActions}>
                <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Event
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;

