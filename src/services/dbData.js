import { getCurrentUser } from './auth'

export async function getAllTodos(supa) {
  // With RLS in place this returns only the current user's todos.
  const { data, error } = await supa
    .from('todos')
    .select('id, title, details, completed, inserted_at, updated_at')
    .order('inserted_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createTodo(supa, { title, details = '' }) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not authenticated')
  const { data, error } = await supa
    .from('todos')
    .insert([{ user_id: user.id, title, details }])
    .select()
  if (error) throw error
  return data[0]
}

export async function updateTodo(supa, id, changes) {
  const { data, error } = await supa.from('todos').update(changes).eq('id', id).select()
  if (error) throw error
  return data[0]
}

export async function deleteTodo(supa, id) {
  const { data, error } = await supa.from('todos').delete().eq('id', id).select()
  if (error) throw error
  return data[0]
}
