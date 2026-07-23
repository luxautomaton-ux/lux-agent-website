import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://khyzmyvrfjwwnbvwfhhk.supabase.co";
export const supabasePublishableKey = "sb_publishable_9JACLV1avf-YvQQ7ScKYkQ_6PTMipgh";

export const LUX_ADMIN_UID = "08225005-1556-42d9-8c9e-691185769300";
export const LUX_ADMIN_EMAIL = "luxautomaton@gmail.com";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
