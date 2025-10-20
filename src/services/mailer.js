export async function notifyMailer(type, event) {
  const adminUrl = `${location.origin}/admin/events/${event.id}`;
  const publicUrl = `${location.origin}/event/${event.id}`;
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/event-mailer`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` // keep JWT verify ON
    },
    body: JSON.stringify({ type, event, adminUrl, publicUrl })
  });
  if (!res.ok) console.warn('Mailer error:', await res.text());
}
