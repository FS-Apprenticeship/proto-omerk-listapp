import { createClient } from '@supabase/supabase-js'

export function getClient() {
  const url = import.meta.env.VITE_APP_SUPABASE_URL
  const key = import.meta.env.VITE_APP_SUPABASE_KEY

  const supabase = createClient(url, key)
  return supabase
}

export async function getAllTodos(supa) {
  const { data } = await supa.from('todos').select()
  return data
}
