import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

if (!supabaseUrl && typeof window !== 'undefined') {
  console.error("NEXT_PUBLIC_SUPABASE_URL is missing")
}

// Client for browser usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side usage (full access)
// Only initialize if we have the key, and it's almost certainly server-side only
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabase
