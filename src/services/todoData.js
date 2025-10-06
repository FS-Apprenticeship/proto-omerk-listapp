import { getCurrentUser } from './auth'
import { checkDefaultList } from './listData'

// -------------- TODOS --------------
export async function getAllTodos(supa, list_id) {
  const { data, error } = await supa
    .from('todos')
    .select('id, completed, title, inserted_at, list_id')
    .eq('list_id', list_id)
    .order('inserted_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createTodo(supa, { title, list_id }) {
  const user = await getCurrentUser(supa)
  if (!user) throw new Error('Not authenticated')

  // check if at least one list exists
  await checkDefaultList(supa)

  const { data, error } = await supa
    .from('todos')
    .insert([{ user_id: user.id, title, list_id: list_id }])
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
