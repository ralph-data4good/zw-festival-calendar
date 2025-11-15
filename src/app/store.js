import { create } from 'zustand';
import { api } from '../services/api';

export const useStore = create((set, get) => ({
  // Data
  events: [],
  topics: [],
  categories: [],
  campaigns: [],
  organizers: [],
  partners: [],
  loading: false,
  error: null,

  // Filters
  filters: {
    q: '',
    country: '',
    category: '',
    modality: '',
    topics: [],
    tags: [],
    dateFrom: '',
    dateTo: '',
    campaign: '',
  },

  // Bootstrap - Load all data
  bootstrap: async () => {
    set({ loading: true, error: null });
    try {
      const [events, topics, categories, campaigns, organizers, partners] = await Promise.all([
        api.events(),
        api.topics(),
        api.categories(),
        api.campaigns(),
        api.organizers(),
        api.partners(),
      ]);
      set({ events, topics, categories, campaigns, organizers, partners, loading: false });
    } catch (error) {
      console.error('Failed to load data:', error);
      set({ error: error.message, loading: false });
    }
  },

  // Set single filter
  setFilter: (key, value) => {
    set({ filters: { ...get().filters, [key]: value } });
  },

  // Set multiple filters at once
  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
  },

  // Reset filters
  resetFilters: () => {
    set({
      filters: {
        q: '',
        country: '',
        category: '',
        modality: '',
        topics: [],
        tags: [],
        dateFrom: '',
        dateTo: '',
        campaign: '',
      },
    });
  },

  // Get filtered events
  getFilteredEvents: () => {
    const { events, filters } = get();
    let filtered = [...events];

    // Text search
    if (filters.q) {
      const q = filters.q.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.title?.toLowerCase().includes(q) ||
          e.summary?.toLowerCase().includes(q) ||
          e.organizer_name?.toLowerCase().includes(q)
      );
    }

    // Country filter
    if (filters.country) {
      filtered = filtered.filter((e) => e.country === filters.country);
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((e) => e.category === filters.category);
    }

    // Modality filter
    if (filters.modality) {
      filtered = filtered.filter((e) => e.modality === filters.modality);
    }

    // Topics filter (array - match ANY)
    if (filters.topics.length > 0) {
      filtered = filtered.filter((e) =>
        e.topics?.some((t) => filters.topics.includes(t))
      );
    }

    // Tags filter (array - match ANY)
    if (filters.tags.length > 0) {
      filtered = filtered.filter((e) =>
        e.tags?.some((t) => filters.tags.includes(t))
      );
    }

    // Date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter((e) => new Date(e.start_datetime) >= new Date(filters.dateFrom));
    }

    if (filters.dateTo) {
      filtered = filtered.filter((e) => new Date(e.start_datetime) <= new Date(filters.dateTo));
    }

    // Campaign filter
    if (filters.campaign) {
      filtered = filtered.filter((e) => e.campaign_id === filters.campaign);
    }

    return filtered;
  },

  // Get unique countries from events
  getCountries: () => {
    const { events } = get();
    const countries = [...new Set(events.map((e) => e.country).filter(Boolean))];
    return countries.sort();
  },

  // Get key moments (featured campaigns)
  getFeaturedCampaigns: () => {
    const { campaigns } = get();
    return campaigns.filter((c) => c.featured);
  },
}));

