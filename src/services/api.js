const BASE = '/festival-2025/data';

async function getJSON(name) {
  const res = await fetch(`${BASE}/${name}.json`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load ${name}`);
  return res.json();
}

export const api = {
  events: () => getJSON('events'),
  topics: () => getJSON('topics'),
  categories: () => getJSON('categories'),
  campaigns: () => getJSON('campaigns'),
  organizers: () => getJSON('organizers'),
  partners: () => getJSON('partners'),
};

import { supabase } from './supabase';

export async function listPublishedEvents(filters = {}) {
  let q = supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('start_datetime', { ascending: true });

  if (filters.country) q = q.eq('country_code', filters.country);
  if (filters.modality) q = q.eq('modality', filters.modality);
  if (filters.category) q = q.eq('category_id', filters.category);
  if (filters.q) q = q.ilike('title', `%${filters.q}%`);
  if (filters.dateFrom) q = q.gte('start_datetime', filters.dateFrom);
  if (filters.dateTo) q = q.lte('end_datetime', filters.dateTo);

  const { data, error } = await q;
  if (error) throw error;
  return data || [];
}

export async function submitEvent(payload) {
  const row = { ...payload, status: 'under_review' }; // RLS expects this
  const { data, error } = await supabase
    .from('events')
    .insert([row])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function uploadPoster(file) {
  const path = `${crypto.randomUUID()}-${file.name}`;
  const { error } = await supabase.storage.from('posters').upload(path, file);
  if (error) throw error;
  const { data: pub } = supabase.storage.from('posters').getPublicUrl(path);
  return pub.publicUrl; // store in events.cover_image_url
}


// Future: Replace with Supabase REST calls
// Example:
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );
//
// export const api = {
//   events: async () => {
//     const { data, error } = await supabase.from('events').select('*');
//     if (error) throw error;
//     return data;
//   },
//   insertEvent: async (payload) => {
//     const { data, error } = await supabase.from('events').insert(payload);
//     if (error) throw error;
//     return data;
//   },
//   // ... other methods
// };

