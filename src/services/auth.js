import { createClient } from '@supabase/supabase-js'

function getClient() {
  const url = import.meta.env.VITE_APP_SUPABASE_URL
  const key = import.meta.env.VITE_APP_SUPABASE_KEY

  const supabase = createClient(url, key, {
    auth: {
      persistSession: true,
    },
  })
  return supabase
}

// we are exporting the client now, not the getClient method
export const supa = getClient()

export async function getAllTodos(supa) {
  const { data } = await supa.from('todos').select()
  return data
}

export async function signUp(supa, email, password) {
  // returns user/session info
  const { data, error } = await supa.auth.signUp({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signIn(supa, email, password) {
  const { data, error } = await supa.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    throw error
  }
  return data // contains session, user
}

export async function signOut(supa) {
  const { error } = await supa.auth.signOut()
  if (error) {
    throw error
  }
  return true
}

export async function getCurrentUser(supa) {
  const { data, error } = await supa.auth.getUser()
  if (error) {
    throw error
  }
  return data.user
}
