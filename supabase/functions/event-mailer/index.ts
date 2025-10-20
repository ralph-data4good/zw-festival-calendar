// ============================================================================
// ZERO WASTE FESTIVAL 2025 - EMAIL NOTIFICATION EDGE FUNCTION
// ============================================================================
// This Edge Function sends transactional emails via Resend API
// Triggered on event submission and publication
// ============================================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Environment variables
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "events@zerowaste.asia";
const ADMIN_EMAILS = (Deno.env.get("ADMIN_EMAILS") || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Send email via Resend API
 */
async function sendEmail(to: string | string[], subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return { ok: false, error: "Email service not configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Resend API error:", text);
      return { ok: false, status: res.status, error: text };
    }

    const data = await res.json();
    return { ok: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { ok: false, error: String(error) };
  }
}

/**
 * Format date for display
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

/**
 * Email template: Event submitted (to organizer)
 */
function emailSubmittedOrganizer(event: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1A1A1A; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #4A8FC7; color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #F5F3ED; padding: 30px 20px; }
    .event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #6B6B6B; font-size: 0.9rem; }
    .button { display: inline-block; padding: 12px 24px; background: #4A8FC7; color: white; text-decoration: none; border-radius: 8px; margin: 10px 0; }
    h1 { margin: 0; font-size: 24px; }
    h2 { color: #4A8FC7; font-size: 20px; margin-top: 0; }
    .label { font-weight: 600; color: #5B8C5A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌍 Thank You for Your Submission!</h1>
    </div>
    <div class="content">
      <p>Hi ${event.contact_person || "there"},</p>
      
      <p>Thank you for submitting your event to the <strong>Zero Waste Festival 2025</strong> calendar!</p>
      
      <div class="event-details">
        <h2>Event Details Received</h2>
        <p><span class="label">Title:</span> ${event.title}</p>
        <p><span class="label">Date:</span> ${formatDate(event.start_datetime)}</p>
        <p><span class="label">Location:</span> ${event.city || "Online"}, ${event.country_code || ""}</p>
        <p><span class="label">Modality:</span> ${event.modality}</p>
      </div>
      
      <p><strong>What happens next?</strong></p>
      <ul>
        <li>Our team will review your event within 1-2 business days</li>
        <li>We'll verify the details and check for completeness</li>
        <li>You'll receive a notification once your event is published</li>
      </ul>
      
      <p>If we need any additional information, we'll reach out to you at <strong>${event.contact_email}</strong>.</p>
      
      <p>Thank you for being part of the global zero waste movement! 🌱</p>
    </div>
    <div class="footer">
      <p><strong>Zero Waste Festival 2025</strong></p>
      <p>Part of International Zero Waste Month</p>
      <p><a href="https://zerowaste.asia">zerowaste.asia</a></p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Email template: Event submitted (to admins)
 */
function emailSubmittedAdmin(event: any, adminUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1A1A1A; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #5B8C5A; color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #F5F3ED; padding: 30px 20px; }
    .event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .button { display: inline-block; padding: 12px 24px; background: #4A8FC7; color: white; text-decoration: none; border-radius: 8px; margin: 10px 0; }
    h1 { margin: 0; font-size: 24px; }
    .label { font-weight: 600; color: #5B8C5A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📥 New Event Submission</h1>
    </div>
    <div class="content">
      <p>A new event has been submitted and is pending review.</p>
      
      <div class="event-details">
        <p><span class="label">Title:</span> ${event.title}</p>
        <p><span class="label">Organizer:</span> ${event.organizer_name || event.contact_person}</p>
        <p><span class="label">Contact:</span> ${event.contact_email}</p>
        <p><span class="label">Date:</span> ${formatDate(event.start_datetime)} → ${formatDate(event.end_datetime)}</p>
        <p><span class="label">Timezone:</span> ${event.timezone}</p>
        <p><span class="label">Modality:</span> ${event.modality}</p>
        <p><span class="label">Location:</span> ${event.city || "N/A"}, ${event.country_code || "N/A"}</p>
        ${event.summary ? `<p><span class="label">Summary:</span> ${event.summary}</p>` : ""}
      </div>
      
      <p style="text-align: center;">
        <a href="${adminUrl}" class="button">📝 Review in Admin Dashboard</a>
      </p>
      
      <p><small>Event ID: ${event.id}</small></p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Email template: Event published (to organizer)
 */
function emailPublishedOrganizer(event: any, publicUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1A1A1A; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #4A8FC7, #A4BF3D); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #F5F3ED; padding: 30px 20px; }
    .event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #A4BF3D; }
    .button { display: inline-block; padding: 14px 28px; background: #A4BF3D; color: white; text-decoration: none; border-radius: 8px; margin: 10px 0; font-weight: 600; }
    h1 { margin: 0; font-size: 28px; }
    .emoji { font-size: 40px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="emoji">🎉</div>
      <h1>Your Event is Now LIVE!</h1>
    </div>
    <div class="content">
      <p>Hi ${event.contact_person || "there"},</p>
      
      <p>Great news! Your event <strong>${event.title}</strong> has been published on the Zero Waste Festival 2025 calendar and is now visible to the global community.</p>
      
      <div class="event-details">
        <p><strong>${event.title}</strong></p>
        <p>📅 ${formatDate(event.start_datetime)}</p>
        <p>📍 ${event.city || "Online"}, ${event.country_code || ""}</p>
      </div>
      
      <p style="text-align: center;">
        <a href="${publicUrl}" class="button">🌍 View Your Event</a>
      </p>
      
      <p><strong>What's next?</strong></p>
      <ul>
        <li>Share your event link with your networks</li>
        <li>Encourage participants to add it to their calendars</li>
        <li>Tag us on social media: @zerowaste</li>
      </ul>
      
      <p>Thank you for contributing to a waste-free future! 🌱</p>
      
      <p>See you at the event!</p>
    </div>
    <div class="footer" style="text-align: center; padding: 20px; color: #6B6B6B; font-size: 0.9rem;">
      <p><strong>Zero Waste Festival 2025</strong></p>
      <p>Part of International Zero Waste Month</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Main handler
 */
Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const { type, event, adminUrl, publicUrl } = payload;

    if (!type || !event) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing required fields: type, event" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let results: any[] = [];

    // Handle "submitted" notification
    if (type === "submitted") {
      // 1. Email organizer
      const organizerResult = await sendEmail(
        event.contact_email,
        `Thank you! Your event "${event.title}" was submitted`,
        emailSubmittedOrganizer(event)
      );
      results.push({ to: "organizer", ...organizerResult });

      // 2. Email admins
      if (ADMIN_EMAILS.length > 0) {
        const adminResult = await sendEmail(
          ADMIN_EMAILS,
          `[Admin] New event submitted: ${event.title}`,
          emailSubmittedAdmin(event, adminUrl)
        );
        results.push({ to: "admins", ...adminResult });
      }
    }

    // Handle "published" notification
    if (type === "published") {
      // Email organizer that event is live
      const publishResult = await sendEmail(
        event.contact_email,
        `🎉 Your event "${event.title}" is now LIVE!`,
        emailPublishedOrganizer(event, publicUrl)
      );
      results.push({ to: "organizer", ...publishResult });
    }

    return new Response(
      JSON.stringify({ ok: true, results }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Edge Function error:", error);
    return new Response(
      JSON.stringify({ ok: false, error: String(error) }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});

