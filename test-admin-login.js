/**
 * Admin Login Diagnostic Tool
 * Run this to test your Supabase connection and admin setup
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Load .env manually since we're in Node
const envContent = readFileSync('.env', 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY;

console.log('\n🔍 Admin Login Diagnostic Tool\n');
console.log('=' .repeat(50));

// Test 1: Check environment variables
console.log('\n1️⃣ Checking environment variables...');
if (!supabaseUrl) {
  console.log('   ❌ VITE_SUPABASE_URL is missing');
} else {
  console.log(`   ✅ VITE_SUPABASE_URL: ${supabaseUrl}`);
}

if (!supabaseAnonKey) {
  console.log('   ❌ VITE_SUPABASE_ANON_KEY is missing');
} else {
  console.log(`   ✅ VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey.substring(0, 20)}...`);
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('\n❌ Missing credentials! Cannot proceed.\n');
  process.exit(1);
}

// Test 2: Create Supabase client
console.log('\n2️⃣ Creating Supabase client...');
let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('   ✅ Supabase client created');
} catch (error) {
  console.log('   ❌ Failed to create client:', error.message);
  process.exit(1);
}

// Test 3: Test connection
console.log('\n3️⃣ Testing Supabase connection...');
try {
  const { data, error } = await supabase.from('events').select('count', { count: 'exact', head: true });
  if (error && error.code === '42P01') {
    console.log('   ⚠️  Events table does not exist');
    console.log('   → You need to run SUPABASE_SETUP.sql in SQL Editor');
  } else if (error) {
    console.log('   ❌ Connection error:', error.message);
  } else {
    console.log('   ✅ Connection successful');
    console.log(`   ℹ️  Found ${data} events in database`);
  }
} catch (error) {
  console.log('   ❌ Connection test failed:', error.message);
}

// Test 4: Check for admin users
console.log('\n4️⃣ Checking for admin users...');
try {
  // Try to query users with admin role via RPC or auth.users
  // Note: We can't directly query auth.users with anon key, so we check app_metadata via a function
  console.log('   ⚠️  Cannot check admin users with anon key');
  console.log('   → You need to manually verify in Supabase Dashboard');
  console.log('   → Go to: Authentication → Users');
  console.log('   → Check if user has app_metadata: {"role": "admin"}');
} catch (error) {
  console.log('   ⚠️  Could not check admin users:', error.message);
}

// Test 5: Test auth with example (will fail unless you provide real credentials)
console.log('\n5️⃣ Testing authentication...');
console.log('   To test login, you need to:');
console.log('   1. Create an admin user in Supabase Dashboard');
console.log('   2. Set app_metadata: {"role": "admin"}');
console.log('   3. Try logging in at http://localhost:3005/admin/login');

console.log('\n' + '='.repeat(50));
console.log('\n📋 Checklist for Admin Login to Work:\n');

const checklist = [
  { item: 'Supabase project created', status: '✓' },
  { item: 'SUPABASE_SETUP.sql executed in SQL Editor', status: '?' },
  { item: 'Storage buckets created (posters, logos)', status: '?' },
  { item: 'Admin user created in Authentication → Users', status: '?' },
  { item: 'Admin user has app_metadata: {"role": "admin"}', status: '?' },
  { item: '.env file exists with correct credentials', status: '✓' },
  { item: 'Dev server running (npm run dev)', status: '?' },
];

checklist.forEach(({ item, status }) => {
  console.log(`   ${status === '✓' ? '✅' : '❓'} ${item}`);
});

console.log('\n💡 Common Issues:\n');
console.log('   1. Admin user missing "role": "admin" in app_metadata');
console.log('   2. Database schema not set up (run SUPABASE_SETUP.sql)');
console.log('   3. Dev server not restarted after creating .env');
console.log('   4. Wrong email or password');
console.log('   5. Email not confirmed in Supabase');

console.log('\n🔧 Next Steps:\n');
console.log('   1. Verify database schema:');
console.log('      → Go to Supabase Dashboard → SQL Editor');
console.log('      → Run: SELECT * FROM events LIMIT 1;');
console.log('      → Should return data or empty result (not error)');
console.log('');
console.log('   2. Verify admin user:');
console.log('      → Go to Authentication → Users');
console.log('      → Find your admin user');
console.log('      → Check app_metadata has: {"role": "admin"}');
console.log('');
console.log('   3. Start dev server:');
console.log('      → Run: npm run dev');
console.log('');
console.log('   4. Test login:');
console.log('      → Open: http://localhost:3005/admin/login');
console.log('      → Enter your credentials');
console.log('      → Check browser console (F12) for errors');

console.log('\n✅ Diagnostic complete!\n');

