// Generate 100 test events for edge case testing
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const countries = [
  'Philippines', 'Singapore', 'Thailand', 'Indonesia', 'Malaysia', 
  'Vietnam', 'Cambodia', 'Myanmar', 'Laos', 'Brunei',
  'Japan', 'South Korea', 'China', 'India', 'Bangladesh',
  'Pakistan', 'Sri Lanka', 'Nepal', 'Taiwan', 'Hong Kong',
  'Australia', 'New Zealand', 'United States', 'United Kingdom', 'Canada',
  'Germany', 'France', 'Netherlands', 'Global'
];

const cities = [
  'Manila', 'Singapore', 'Bangkok', 'Jakarta', 'Kuala Lumpur',
  'Ho Chi Minh City', 'Phnom Penh', 'Yangon', 'Vientiane', 'Bandar Seri Begawan',
  'Tokyo', 'Seoul', 'Beijing', 'Mumbai', 'Dhaka',
  'Karachi', 'Colombo', 'Kathmandu', 'Taipei', 'Hong Kong',
  'Sydney', 'Auckland', 'New York', 'London', 'Toronto'
];

// Real coordinates for major Asian cities
const cityCoordinates = {
  'Manila': { lat: 14.5995, lng: 120.9842 },
  'Singapore': { lat: 1.3521, lng: 103.8198 },
  'Bangkok': { lat: 13.7563, lng: 100.5018 },
  'Jakarta': { lat: -6.2088, lng: 106.8456 },
  'Kuala Lumpur': { lat: 3.1390, lng: 101.6869 },
  'Ho Chi Minh City': { lat: 10.8231, lng: 106.6297 },
  'Phnom Penh': { lat: 11.5564, lng: 104.9282 },
  'Yangon': { lat: 16.8661, lng: 96.1951 },
  'Vientiane': { lat: 17.9757, lng: 102.6331 },
  'Bandar Seri Begawan': { lat: 4.9031, lng: 114.9398 },
  'Tokyo': { lat: 35.6762, lng: 139.6503 },
  'Seoul': { lat: 37.5665, lng: 126.9780 },
  'Beijing': { lat: 39.9042, lng: 116.4074 },
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Dhaka': { lat: 23.8103, lng: 90.4125 },
  'Karachi': { lat: 24.8607, lng: 67.0011 },
  'Colombo': { lat: 6.9271, lng: 79.8612 },
  'Kathmandu': { lat: 27.7172, lng: 85.3240 },
  'Taipei': { lat: 25.0330, lng: 121.5654 },
  'Hong Kong': { lat: 22.3193, lng: 114.1694 },
  'Sydney': { lat: -33.8688, lng: 151.2093 },
  'Auckland': { lat: -36.8485, lng: 174.7633 },
  'New York': { lat: 40.7128, lng: -74.0060 },
  'London': { lat: 51.5074, lng: -0.1278 },
  'Toronto': { lat: 43.6532, lng: -79.3832 }
};

// Weight modalities to favor events with location (70% in-person, 20% hybrid, 10% online)
const modalityWeights = [
  ...Array(70).fill('In-person'),
  ...Array(20).fill('Hybrid'),
  ...Array(10).fill('Online')
];

const categories = [
  'workshop', 'cleanup', 'webinar', 'conference', 
  'campaign-launch', 'marketplace', 'film-screening', 'training'
];

const topics = [
  'circular-economy', 'waste-reduction', 'plastic-free', 'composting',
  'policy', 'ocean-conservation', 'community-action', 'sustainable-business',
  'youth-engagement', 'zero-waste-lifestyle', 'food-waste', 'textile-waste'
];

const titlePrefixes = [
  'Workshop on', 'Webinar:', 'Community', 'Introduction to',
  'Advanced', 'Beginner\'s Guide to', 'Annual', 'Monthly'
];

const titleTypes = [
  'Zero Waste Living', 'Composting Basics', 'Plastic-Free Solutions',
  'Circular Economy', 'Waste Reduction', 'Sustainable Business',
  'Community Cleanup', 'Eco-Friendly Practices'
];

const timezones = [
  'Asia/Manila', 'Asia/Singapore', 'Asia/Bangkok', 'Asia/Jakarta',
  'Asia/Kuala_Lumpur', 'Asia/Ho_Chi_Minh', 'Asia/Tokyo', 'Asia/Seoul',
  'UTC', 'America/New_York', 'Europe/London'
];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateDate = (daysOffset, hour) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hour, Math.floor(Math.random() * 60), 0, 0);
  return date.toISOString();
};

const addHours = (dateStr, hours) => {
  const date = new Date(dateStr);
  date.setHours(date.getHours() + hours);
  return date.toISOString();
};

function generateEvent(index) {
  // Spread events across time range
  const daysOffset = Math.floor((index - 50) * 2); // -100 to +100 days range
  const startHour = 8 + Math.floor(Math.random() * 12); // 8 AM to 8 PM
  const duration = [1, 2, 3, 4, 6, 8][Math.floor(Math.random() * 6)];
  
  const modality = randomItem(modalityWeights); // Weighted selection
  const country = randomItem(countries);
  const isOnline = modality === 'Online';
  
  // Edge cases for specific indices
  let title, summary;
  
  if (index === 0) {
    // Very long title
    title = 'International Zero Waste Summit: Transforming Communities Through Sustainable Practices and Circular Economy Innovation for a Better Future';
  } else if (index === 1) {
    // Short title
    title = 'Talk';
  } else if (index === 2) {
    // Special characters
    title = 'Workshop: "Reduce, Reuse, Recycle!" - A Guide (2025) #ZeroWaste';
  } else {
    title = `${randomItem(titlePrefixes)} ${randomItem(titleTypes)}`;
  }
  
  // Vary summary length
  if (index % 10 === 0) {
    summary = 'Join us for an exciting event focused on zero waste principles.';
  } else if (index % 7 === 0) {
    summary = 'This comprehensive multi-day program brings together experts, practitioners, and enthusiasts from around the world to explore innovative solutions for waste reduction. Through interactive workshops, panel discussions, and networking sessions, participants will gain practical skills and connect with like-minded individuals committed to creating a sustainable future.';
  } else {
    summary = `Learn about ${randomItem(topics).replace('-', ' ')} and connect with the community. This ${duration}-hour event will feature expert speakers and hands-on activities.`;
  }
  
  const start_datetime = generateDate(daysOffset, startHour);
  const end_datetime = addHours(start_datetime, duration);
  
  // Select a city and get its coordinates
  const city = isOnline ? '' : randomItem(cities);
  const coordinates = !isOnline && cityCoordinates[city] 
    ? cityCoordinates[city] 
    : null;
  
  // Add slight random variation to coordinates to spread markers
  const latitude = coordinates 
    ? coordinates.lat + (Math.random() - 0.5) * 0.5  // ±0.25 degree variation
    : null;
  const longitude = coordinates 
    ? coordinates.lng + (Math.random() - 0.5) * 0.5  // ±0.25 degree variation
    : null;
  
  const event = {
    id: `evt-test-${String(index + 1).padStart(3, '0')}`,
    title: title,
    modality: modality,
    country: country,
    city: city,
    venue_name: isOnline ? '' : (index % 3 === 0 ? '' : `${randomItem(['Community', 'Green', 'Eco', 'Unity'])} ${randomItem(['Center', 'Hub', 'Hall', 'Space'])}`),
    address: isOnline ? '' : (index % 4 === 0 ? '' : `${Math.floor(Math.random() * 999) + 1} ${randomItem(['Main', 'Green', 'Eco', 'Sustainability'])} Street`),
    latitude: latitude,
    longitude: longitude,
    start_datetime: start_datetime,
    end_datetime: end_datetime,
    timezone: randomItem(timezones),
    category: randomItem(categories),
    topics: randomItems(topics, Math.floor(Math.random() * 4) + 1),
    tags: randomItems(['beginner-friendly', 'free-event', 'online-option', 'family-friendly', 'youth', 'professionals', 'english', 'multi-day'], Math.floor(Math.random() * 3)),
    summary: summary,
    description: index % 5 === 0 ? '' : `Join us for an engaging ${modality.toLowerCase()} event focused on zero waste principles.\n\nWhat to expect:\n- Expert presentations\n- Interactive workshops\n- Networking opportunities\n- Q&A sessions\n\nPerfect for ${randomItem(['beginners', 'professionals', 'students', 'activists', 'everyone'])}!`,
    poster_url: index % 3 === 0 ? '' : `https://images.unsplash.com/photo-${1500000000000 + index}?w=800`,
    registration_url: index % 4 === 0 ? '' : `https://example.com/register/evt-test-${index}`,
    organizer_name: `${randomItem(['Green', 'Eco', 'Zero Waste', 'Sustainable', 'Community'])} ${randomItem(['Alliance', 'Network', 'Collective', 'Initiative', 'Foundation'])}`,
    campaign_id: index % 3 === 0 ? randomItem(['izwm2025', 'plastic-free-july', 'zero-waste-cities']) : null,
    created_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  };
  
  return event;
}

// Generate 101 events (0-100 index)
const events = Array.from({ length: 101 }, (_, i) => generateEvent(i));

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

console.log('✅ Generated 101 test events');
console.log(`📍 ${eventsWithLocation.length} events have location data`);
console.log(`📊 Modality breakdown:`);
console.log(`   - In-person: ${modalityCounts['In-person']}`);
console.log(`   - Hybrid: ${modalityCounts['Hybrid']}`);
console.log(`   - Online: ${modalityCounts['Online']}`);
console.log(`📁 Saved to: ${outputPath}`);
