// src/utils/supaClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nohdhimjdnmcytzooteh.supabase.co/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vaGRoaW1qZG5tY3l0em9vdGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2MTQxMTYsImV4cCI6MjAxMzE5MDExNn0.eMf4hEVpCbP-lJUGfPGPa4C82SrEghWhQila_Fu34hw';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
