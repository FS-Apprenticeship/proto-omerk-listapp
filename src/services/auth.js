import { createClient } from '@supabase/supabase-js'

function getClient() {
  const supabase = createClient('https://xyzcompany.supabase.co', 'publishable-or-anon-key')
  return supabase
}
