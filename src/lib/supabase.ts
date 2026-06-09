import { createClient } from '@supabase/supabase-js';

// Publishable anon key — safe to expose in client code. Row-Level Security
// protects every database query, so this key alone grants no privileged
// access. Mirrors the app's EXPO_PUBLIC_SUPABASE_* values.
const SUPABASE_URL = 'https://jvrzmgzawzoapcnporhi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_VHymNgTH3FhU28oZozAF1w_tQprNWpi';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
