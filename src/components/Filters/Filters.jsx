import React, { useState } from 'react';
import { useStore } from '../../app/store';
import Icons from '../Icons/Icons';
import styles from './Filters.module.css';

function Filters({ compact = false }) {
  const [isExpanded, setIsExpanded] = useState(!compact);
  
  const filters = useStore((state) => state.filters);
  const setFilter = useStore((state) => state.setFilter);
  const resetFilters = useStore((state) => state.resetFilters);
  const countries = useStore((state) => state.getCountries());
  const categories = useStore((state) => state.categories);
  const topics = useStore((state) => state.topics);

  const handleTextSearch = (e) => {
    setFilter('q', e.target.value);
  };

  const handleCountryChange = (e) => {
    setFilter('country', e.target.value);
  };

  const handleCategoryChange = (e) => {
    setFilter('category', e.target.value);
  };

  const handleModalityChange = (e) => {
    setFilter('modality', e.target.value);
  };

  const handleTopicToggle = (topicId) => {
    const current = filters.topics || [];
    if (current.includes(topicId)) {
      setFilter('topics', current.filter((t) => t !== topicId));
    } else {
      setFilter('topics', [...current, topicId]);
    }
  };

  const handleDateFromChange = (e) => {
    setFilter('dateFrom', e.target.value);
  };

  const handleDateToChange = (e) => {
    setFilter('dateTo', e.target.value);
  };

  const hasActiveFilters = 
    filters.q || 
    filters.country || 
    filters.category || 
    filters.modality || 
    filters.topics.length > 0 ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className={styles.filters}>
      {compact && (
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? '▼' : '▶'} Filters
          {hasActiveFilters && <span className={styles.activeBadge}>•</span>}
        </button>
      )}

      {isExpanded && (
        <div className={styles.filtersContent}>
          <div className={styles.filterHeader}>
            <h3>Filters</h3>
            {hasActiveFilters && (
              <button 
                type="button"
                className="btn-text" 
                onClick={resetFilters}
              >
                Clear All
              </button>
            )}
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="search"><Icons.Search size={16} /> Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search events..."
              value={filters.q}
              onChange={handleTextSearch}
              className={styles.input}
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="country"><Icons.Globe size={16} /> Country</label>
            <select
              id="country"
              value={filters.country}
              onChange={handleCountryChange}
              className={styles.select}
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="category"><Icons.Folder size={16} /> Category</label>
            <select
              id="category"
              value={filters.category}
              onChange={handleCategoryChange}
              className={styles.select}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="modality"><Icons.MapPin size={16} /> Modality</label>
            <select
              id="modality"
              value={filters.modality}
              onChange={handleModalityChange}
              className={styles.select}
            >
              <option value="">All Types</option>
              <option value="In-person">In-person</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label><Icons.Tag size={16} /> Topics</label>
            <div className={styles.topicsList}>
              {topics.slice(0, 8).map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  className={`chip ${filters.topics.includes(topic.id) ? 'active' : ''}`}
                  onClick={() => handleTopicToggle(topic.id)}
                >
                  {topic.name}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="dateFrom"><Icons.Calendar size={16} /> From Date</label>
            <input
              id="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={handleDateFromChange}
              className={styles.input}
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="dateTo"><Icons.Calendar size={16} /> To Date</label>
            <input
              id="dateTo"
              type="date"
              value={filters.dateTo}
              onChange={handleDateToChange}
              className={styles.input}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters;
