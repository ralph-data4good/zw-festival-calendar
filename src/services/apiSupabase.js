/**
 * Supabase API Service
 * 
 * This service provides a complete API layer for interacting with Supabase.
 * It includes methods for events, reference data, storage, and admin operations.
 */

import { supabase, isSupabaseConfigured } from './supabase';

// ============================================================================
// PUBLIC API - Events
// ============================================================================

/**
 * Fetch published events with optional filters
 */
export async function listPublishedEvents(filters = {}) {
  if (!supabase) throw new Error('Supabase not configured');

  let query = supabase
    .from('events')
    .select(`
      *,
      categories:category_id ( id, name, icon ),
      event_topics ( topic_id, topics ( id, slug, name ) ),
      event_campaigns ( campaign_id, campaigns ( id, slug, title, emoji ) ),
      event_partners ( partner_id, position, partners ( id, name, logo_url, website ) )
    `)
    .eq('status', 'published')
    .order('start_datetime', { ascending: true });

  // Apply filters
  if (filters.country) query = query.eq('country_code', filters.country);
  if (filters.city) query = query.ilike('city', `%${filters.city}%`);
  if (filters.modality) query = query.eq('modality', filters.modality);
  if (filters.category) query = query.eq('category_id', filters.category);
  if (filters.dateFrom) query = query.gte('start_datetime', filters.dateFrom);
  if (filters.dateTo) query = query.lte('end_datetime', filters.dateTo);
  if (filters.q) query = query.ilike('title', `%${filters.q}%`);
  
  // Campaign filter (check junction table)
  if (filters.campaign) {
    const { data: campaignEvents } = await supabase
      .from('event_campaigns')
      .select('event_id')
      .eq('campaign_id', filters.campaign);
    
    if (campaignEvents) {
      const eventIds = campaignEvents.map(ec => ec.event_id);
      query = query.in('id', eventIds);
    }
  }

  // Topic filter (check junction table)
  if (filters.topics && filters.topics.length > 0) {
    const { data: topicEvents } = await supabase
      .from('event_topics')
      .select('event_id')
      .in('topic_id', filters.topics);
    
    if (topicEvents) {
      const eventIds = topicEvents.map(et => et.event_id);
      query = query.in('id', eventIds);
    }
  }

  const { data, error } = await query;
  if (error) throw error;

  // Transform data to match expected format
  return (data || []).map(transformEvent);
}

/**
 * Get a single event by ID
 */
export async function getEventById(id) {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      categories:category_id ( id, name, icon ),
      event_topics ( topic_id, topics ( id, slug, name ) ),
      event_campaigns ( campaign_id, campaigns ( id, slug, title, emoji ) ),
      event_partners ( partner_id, position, partners ( id, name, logo_url, website ) )
    `)
    .eq('id', id)
    .eq('status', 'published')
    .single();

  if (error) throw error;
  return transformEvent(data);
}

/**
 * Submit a new event (public submission - creates as 'under_review')
 */
export async function submitEvent(payload) {
  if (!supabase) throw new Error('Supabase not configured');

  // Prepare event data
  const eventData = {
    title: payload.title,
    summary: payload.summary,
    description: payload.description,
    start_datetime: payload.start_datetime,
    end_datetime: payload.end_datetime,
    timezone: payload.timezone,
    modality: payload.modality?.toLowerCase().replace('-', '_'),
    country_code: payload.country,
    city: payload.city,
    venue_name: payload.venue_name,
    address: payload.address,
    latitude: payload.latitude ? parseFloat(payload.latitude) : null,
    longitude: payload.longitude ? parseFloat(payload.longitude) : null,
    registration_url: payload.registration_url,
    organizer_name: payload.organizer_name,
    contact_person: payload.organizer_name,
    contact_email: payload.organizer_email,
    languages: payload.languages ? payload.languages.split(',').map(l => l.trim()) : [],
    accessibility: payload.accessibility_features ? payload.accessibility_features.split(',').map(a => a.trim()) : [],
    audience: payload.target_audience ? payload.target_audience.split(',').map(a => a.trim()) : [],
    cover_image_url: payload.poster_url,
    tags: payload.tags ? (Array.isArray(payload.tags) ? payload.tags : payload.tags.split(',').map(t => t.trim())) : [],
    status: 'under_review',
  };

  // Insert event
  const { data: event, error: eventError } = await supabase
    .from('events')
    .insert([eventData])
    .select()
    .single();

  if (eventError) throw eventError;

  // Insert topics if provided
  if (payload.topics && payload.topics.length > 0) {
    const topicInserts = payload.topics.map(topicId => ({
      event_id: event.id,
      topic_id: topicId,
    }));
    await supabase.from('event_topics').insert(topicInserts);
  }

  // Insert campaigns if provided
  if (payload.campaign_ids && payload.campaign_ids.length > 0) {
    const campaignInserts = payload.campaign_ids.map(campaignId => ({
      event_id: event.id,
      campaign_id: campaignId,
    }));
    await supabase.from('event_campaigns').insert(campaignInserts);
  }

  return event;
}

// ============================================================================
// REFERENCE DATA
// ============================================================================

/**
 * Get all reference data (categories, campaigns, topics)
 */
export async function getReferenceData() {
  if (!supabase) throw new Error('Supabase not configured');

  const [categories, campaigns, topics] = await Promise.all([
    supabase.from('categories').select('*').order('name', { ascending: true }),
    supabase.from('campaigns').select('*').order('title', { ascending: true }),
    supabase.from('topics').select('*').order('name', { ascending: true }),
  ]);

  return {
    categories: categories.data || [],
    campaigns: campaigns.data || [],
    topics: topics.data || [],
  };
}

/**
 * Get key moments (featured campaigns)
 */
export async function getFeaturedCampaigns() {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('featured', true)
    .order('start_date', { ascending: false });

  if (error) throw error;
  return data || [];
}

// ============================================================================
// STORAGE
// ============================================================================

/**
 * Upload a poster image to storage
 */
export async function uploadPoster(file) {
  if (!supabase) throw new Error('Supabase not configured');

  const fileExt = file.name.split('.').pop();
  const filePath = `${crypto.randomUUID()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('posters')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from('posters')
    .getPublicUrl(filePath);

  return publicUrl.publicUrl;
}

/**
 * Upload a logo image to storage
 */
export async function uploadLogo(file) {
  if (!supabase) throw new Error('Supabase not configured');

  const fileExt = file.name.split('.').pop();
  const filePath = `${crypto.randomUUID()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('logos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from('logos')
    .getPublicUrl(filePath);

  return publicUrl.publicUrl;
}

// ============================================================================
// ADMIN API
// ============================================================================

/**
 * List all events (admin only) with optional status filter
 */
export async function adminListEvents(status = null) {
  if (!supabase) throw new Error('Supabase not configured');

  let query = supabase
    .from('events')
    .select(`
      *,
      categories:category_id ( id, name ),
      event_topics ( topics ( name ) ),
      event_campaigns ( campaigns ( title ) )
    `)
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

/**
 * Get a single event (admin - can see any status)
 */
export async function adminGetEvent(id) {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      categories:category_id ( id, name ),
      event_topics ( topic_id, topics ( id, name ) ),
      event_campaigns ( campaign_id, campaigns ( id, title ) ),
      event_partners ( partner_id, position, partners ( id, name, logo_url ) )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update an event (admin only)
 */
export async function adminUpdateEvent(id, patch) {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('events')
    .update(patch)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Publish an event (admin only)
 */
export async function adminPublishEvent(id) {
  return adminUpdateEvent(id, { status: 'published' });
}

/**
 * Archive an event (admin only)
 */
export async function adminArchiveEvent(id) {
  return adminUpdateEvent(id, { status: 'archived' });
}

/**
 * Delete an event (admin only)
 */
export async function adminDeleteEvent(id) {
  if (!supabase) throw new Error('Supabase not configured');

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ============================================================================
// EMAIL NOTIFICATIONS
// ============================================================================

/**
 * Send email notification via Edge Function
 */
export async function notifyMailer(type, event) {
  if (!supabase) {
    console.warn('Supabase not configured - email notification skipped');
    return;
  }

  const adminUrl = `${window.location.origin}/admin/events/${event.id}`;
  const publicUrl = `${window.location.origin}/event/${event.id}`;

  try {
    const { data, error } = await supabase.functions.invoke('event-mailer', {
      body: {
        type, // 'submitted' or 'published'
        event,
        adminUrl,
        publicUrl,
      },
    });

    if (error) {
      console.error('Email notification failed:', error);
    }

    return data;
  } catch (err) {
    console.error('Failed to send email notification:', err);
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Transform event data from Supabase format to app format
 */
function transformEvent(event) {
  if (!event) return null;

  return {
    ...event,
    id: event.id,
    category: event.categories?.name,
    topics: event.event_topics?.map(et => et.topics?.name).filter(Boolean) || [],
    campaigns: event.event_campaigns?.map(ec => ec.campaigns?.title).filter(Boolean) || [],
    campaign_id: event.event_campaigns?.[0]?.campaign_id || null,
    partners: event.event_partners?.map(ep => ep.partners).filter(Boolean) || [],
    modality: event.modality?.replace('_', '-'),
    country: event.country_code,
    poster_url: event.cover_image_url,
  };
}

/**
 * Check if Supabase is available
 */
export function checkSupabaseConnection() {
  return isSupabaseConfigured();
}

export default {
  // Public API
  listPublishedEvents,
  getEventById,
  submitEvent,
  getReferenceData,
  getFeaturedCampaigns,
  
  // Storage
  uploadPoster,
  uploadLogo,
  
  // Admin API
  adminListEvents,
  adminGetEvent,
  adminUpdateEvent,
  adminPublishEvent,
  adminArchiveEvent,
  adminDeleteEvent,
  
  // Email
  notifyMailer,
  
  // Utility
  checkSupabaseConnection,
};

