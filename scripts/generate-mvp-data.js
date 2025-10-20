// Generate realistic MVP test data for Zero Waste Festival 2025
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Realistic event templates
const eventTemplates = [
  // Workshops
  { title: 'Introduction to Zero Waste Living', category: 'workshop', topics: ['zero-waste-lifestyle', 'waste-reduction'], duration: 2, organizer: 'Zero Waste Singapore' },
  { title: 'Composting 101: Turn Your Food Waste into Gold', category: 'workshop', topics: ['composting', 'food-waste'], duration: 3, organizer: 'Green Manila Initiative' },
  { title: 'DIY Natural Cleaning Products Workshop', category: 'workshop', topics: ['zero-waste-lifestyle', 'sustainable-business'], duration: 2, organizer: 'Eco Warriors Bangkok' },
  { title: 'Plastic-Free Kitchen Masterclass', category: 'workshop', topics: ['plastic-free', 'food-waste'], duration: 3, organizer: 'Plastic Free Jakarta' },
  { title: 'Upcycling Textiles: Give Your Clothes New Life', category: 'workshop', topics: ['textile-waste', 'circular-economy'], duration: 4, organizer: 'Sustainable Fashion Network' },
  
  // Cleanups
  { title: 'Beach Cleanup & Coastal Conservation', category: 'cleanup', topics: ['ocean-conservation', 'community-action'], duration: 3, organizer: 'Ocean Guardians Philippines' },
  { title: 'Community River Cleanup Day', category: 'cleanup', topics: ['community-action', 'waste-reduction'], duration: 2, organizer: 'Rivers for Life Vietnam' },
  { title: 'Urban Park Restoration Project', category: 'cleanup', topics: ['community-action'], duration: 4, organizer: 'Green Cities Coalition' },
  
  // Webinars
  { title: 'The Business Case for Zero Waste', category: 'webinar', topics: ['sustainable-business', 'circular-economy'], duration: 1, organizer: 'Asia Sustainability Network', modality: 'Online' },
  { title: 'Policy Roundtable: Extended Producer Responsibility', category: 'webinar', topics: ['policy', 'circular-economy'], duration: 2, organizer: 'Environmental Policy Institute', modality: 'Online' },
  { title: 'Youth Climate Action Webinar Series', category: 'webinar', topics: ['youth-engagement', 'community-action'], duration: 1, organizer: 'Youth for Zero Waste Asia', modality: 'Online' },
  
  // Conferences
  { title: 'Asia Zero Waste Summit 2025', category: 'conference', topics: ['circular-economy', 'policy', 'sustainable-business'], duration: 8, organizer: 'Zero Waste Asia', tags: ['multi-day', 'professionals'] },
  { title: 'Circular Economy Forum: Innovation & Impact', category: 'conference', topics: ['circular-economy', 'sustainable-business'], duration: 6, organizer: 'Circular Economy Alliance', tags: ['professionals'] },
  
  // Campaign Launches
  { title: 'Plastic Free July Kickoff Event', category: 'campaign-launch', topics: ['plastic-free', 'community-action'], duration: 2, organizer: 'Zero Waste Asia' },
  { title: 'International Zero Waste Month Launch', category: 'campaign-launch', topics: ['waste-reduction', 'community-action'], duration: 3, organizer: 'Zero Waste Asia' },
  
  // Marketplaces
  { title: 'Sustainable Living Marketplace', category: 'marketplace', topics: ['sustainable-business', 'zero-waste-lifestyle'], duration: 6, organizer: 'Green Market Collective' },
  { title: 'Zero Waste Product Fair', category: 'marketplace', topics: ['sustainable-business', 'plastic-free'], duration: 4, organizer: 'Eco Business Network' },
  
  // Film Screenings
  { title: 'Documentary: The Story of Plastic', category: 'film-screening', topics: ['plastic-free', 'ocean-conservation'], duration: 2, organizer: 'Environmental Film Society' },
  { title: 'Film Night: A Plastic Ocean', category: 'film-screening', topics: ['ocean-conservation', 'community-action'], duration: 2, organizer: 'Ocean Defenders' },
  
  // Training
  { title: 'Zero Waste Facilitator Training', category: 'training', topics: ['community-action', 'waste-reduction'], duration: 8, organizer: 'Zero Waste Asia', tags: ['professionals', 'multi-day'] },
  { title: 'Sustainable Business Practices Bootcamp', category: 'training', topics: ['sustainable-business', 'circular-economy'], duration: 16, organizer: 'Business for Environment', tags: ['professionals', 'multi-day'] },
];

// Real organizers
const organizers = [
  'Zero Waste Asia', 'Zero Waste Singapore', 'Green Manila Initiative', 'Eco Warriors Bangkok',
  'Plastic Free Jakarta', 'Sustainable Fashion Network', 'Ocean Guardians Philippines',
  'Rivers for Life Vietnam', 'Green Cities Coalition', 'Asia Sustainability Network',
  'Environmental Policy Institute', 'Youth for Zero Waste Asia', 'Circular Economy Alliance',
  'Green Market Collective', 'Eco Business Network', 'Environmental Film Society',
  'Ocean Defenders', 'Business for Environment', 'Climate Action Network',
  'Sustainable Communities Foundation'
];

// Major Asian cities with real coordinates
const cities = [
  { name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Manila', country: 'Philippines', lat: 14.5995, lng: 120.9842 },
  { name: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018 },
  { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456 },
  { name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869 },
  { name: 'Ho Chi Minh City', country: 'Vietnam', lat: 10.8231, lng: 106.6297 },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'Seoul', country: 'South Korea', lat: 37.5665, lng: 126.9780 },
  { name: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777 },
  { name: 'Taipei', country: 'Taiwan', lat: 25.0330, lng: 121.5654 },
];

const venues = [
  'Community Center', 'Green Hub', 'Eco Space', 'Sustainability Center',
  'Public Library', 'City Hall', 'Convention Center', 'University Campus',
  'Environmental Education Center', 'Innovation Hub'
];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateDate = (daysOffset, hour) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
};

const addHours = (dateStr, hours) => {
  const date = new Date(dateStr);
  date.setHours(date.getHours() + hours);
  return date.toISOString();
};

function generateRealisticEvent(index) {
  // Use templates or create variations
  const template = eventTemplates[index % eventTemplates.length];
  
  // Distribute events across 3 months (past 1 month, current, next 2 months)
  const daysOffset = Math.floor((index / eventTemplates.length) * 30) - 30;
  
  // Business hours: 9 AM - 6 PM
  const startHour = 9 + Math.floor(Math.random() * 9);
  
  // Determine modality
  const modalityChoice = template.modality || (Math.random() < 0.7 ? 'In-person' : (Math.random() < 0.7 ? 'Hybrid' : 'Online'));
  const isOnline = modalityChoice === 'Online';
  
  // Select city
  const city = isOnline ? null : randomItem(cities);
  
  const start_datetime = generateDate(daysOffset, startHour);
  const end_datetime = addHours(start_datetime, template.duration);
  
  // Generate realistic summary
  const summaries = {
    'workshop': `Join us for a hands-on workshop where you'll learn practical skills for ${template.title.toLowerCase()}. Perfect for beginners and those looking to deepen their zero waste practice.`,
    'cleanup': `Be part of the solution! Join community members for ${template.title.toLowerCase()}. All equipment provided. Bring your enthusiasm and help make a difference.`,
    'webinar': `Join environmental experts and practitioners for this online discussion about ${template.title.toLowerCase()}. Q&A session included.`,
    'conference': `${template.title} brings together leaders, innovators, and changemakers to explore solutions for a zero waste future. Network with professionals and gain actionable insights.`,
    'campaign-launch': `Celebrate the launch of this important campaign! ${template.title} marks the beginning of a community-wide movement toward zero waste.`,
    'marketplace': `Discover sustainable products and services at ${template.title}. Support local eco-friendly businesses while learning about zero waste alternatives.`,
    'film-screening': `${template.title} - followed by panel discussion with environmental experts. Refreshments provided.`,
    'training': `Professional development opportunity: ${template.title}. Gain certified skills and practical knowledge to advance zero waste initiatives.`
  };
  
  const event = {
    id: `evt-mvp-${String(index + 1).padStart(3, '0')}`,
    title: template.title,
    modality: modalityChoice,
    country: city?.country || 'Global',
    city: city?.name || '',
    venue_name: isOnline ? '' : `${randomItem(venues)}`,
    address: isOnline ? '' : `${Math.floor(Math.random() * 500) + 1} ${randomItem(['Sustainability', 'Green', 'Eco', 'Main', 'Central'])} Street`,
    latitude: city ? city.lat + (Math.random() - 0.5) * 0.05 : null,
    longitude: city ? city.lng + (Math.random() - 0.5) * 0.05 : null,
    start_datetime: start_datetime,
    end_datetime: end_datetime,
    timezone: city?.country === 'Singapore' ? 'Asia/Singapore' : 
              city?.country === 'Philippines' ? 'Asia/Manila' :
              city?.country === 'Thailand' ? 'Asia/Bangkok' :
              city?.country === 'Japan' ? 'Asia/Tokyo' :
              city?.country === 'India' ? 'Asia/Kolkata' : 'Asia/Singapore',
    category: template.category,
    topics: template.topics,
    tags: template.tags || (modalityChoice === 'Online' ? ['online-option'] : ['beginner-friendly']),
    summary: summaries[template.category],
    description: `${summaries[template.category]}\n\n**What You'll Learn:**\n• Key concepts and practical applications\n• Hands-on activities and demonstrations\n• Networking with like-minded individuals\n• Resources for continued learning\n\n**Who Should Attend:**\nThis event is perfect for anyone interested in zero waste practices, from beginners to experienced practitioners. ${modalityChoice === 'Online' ? 'Join from anywhere!' : 'Limited spots available - register early!'}`,
    poster_url: `https://images.unsplash.com/photo-${1600000000000 + (index * 1234567)}?w=1200`,
    registration_url: isOnline ? `https://zoom.us/meeting/register/${index}` : `https://eventbrite.com/e/${1000000 + index}`,
    organizer_name: template.organizer,
    campaign_id: (() => {
      // Assign campaigns to events based on topic or title keywords
      if (template.title.includes('Plastic') || template.topics.includes('plastic-free')) {
        return 'plastic-free-july';
      }
      if (template.title.includes('Ocean') || template.topics.includes('ocean-conservation')) {
        return 'world-ocean-day';
      }
      if (template.title.includes('Zero Waste') || template.category === 'campaign-launch') {
        return 'izwm-2025';
      }
      // Assign campaign to ~60% of remaining events randomly
      const rand = Math.random();
      if (rand < 0.4) return 'izwm-2025';
      if (rand < 0.6) return 'plastic-free-july';
      if (rand < 0.7) return 'world-ocean-day';
      return null;
    })(),
    created_at: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString()
  };
  
  return event;
}

// Generate events (repeat templates 3 times to get ~60 events)
const numRepeats = 3;
const events = Array.from({ length: eventTemplates.length * numRepeats }, (_, i) => generateRealisticEvent(i));

// Write to file
const outputPath = path.join(__dirname, '../public/festival-2025/data/events.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(events, null, 2));

// Calculate stats
const eventsWithLocation = events.filter(e => e.latitude && e.longitude);
const modalityCounts = {
  'In-person': events.filter(e => e.modality === 'In-person').length,
  'Hybrid': events.filter(e => e.modality === 'Hybrid').length,
  'Online': events.filter(e => e.modality === 'Online').length
};
const categoryCounts = {};
events.forEach(e => {
  categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1;
});

console.log('✅ Generated realistic MVP test data');
console.log(`\n📊 Statistics:`);
console.log(`   Total events: ${events.length}`);
console.log(`   With location data: ${eventsWithLocation.length}`);
console.log(`\n📍 Modality breakdown:`);
console.log(`   - In-person: ${modalityCounts['In-person']}`);
console.log(`   - Hybrid: ${modalityCounts['Hybrid']}`);
console.log(`   - Online: ${modalityCounts['Online']}`);
console.log(`\n📂 Category breakdown:`);
Object.entries(categoryCounts).forEach(([cat, count]) => {
  console.log(`   - ${cat}: ${count}`);
});
console.log(`\n📁 Saved to: ${outputPath}`);
console.log(`\n🎯 MVP-ready with realistic event titles, descriptions, and organizers!`);

