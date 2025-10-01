import { getCurrentUser } from './auth'

export async function getAllTodos(supa) {
  const { data, error } = await supa
    .from('todos')
    .select('id, completed, title, inserted_at, list_id')
    .order('inserted_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getAllLists(supa) {
  await checkDefaultList(supa)

  const { data, error } = await supa
    .from('lists')
    .select('id, list_name')
    .order('created_at', { ascending: true })
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

// currently returns how many lists there are in public.lists
export async function checkDefaultList(supa) {
  const user = await getCurrentUser(supa)
  if (!user) throw new Error('Not authenticated')

  const { data: lists, error } = await supa.from('lists').select('id').eq('user_id', user.id)

  if (error) throw error

  if (lists.length === 0) {
    // Create a default list
    const { data, error: insertError } = await supa
      .from('lists')
      .insert([{ user_id: user.id, list_name: 'Default' }])
      .select()
      .single()

    if (insertError) throw insertError
    // return data;
    // since we just created a default list
    // lists.length == 1
    return 1
  }

  // return lists[0]
  return lists.length
}
