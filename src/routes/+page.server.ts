import { supabase } from '$lib/supabaseClient'
import type { PageServerLoad } from './$types'

// This function loads all of the rows from the todo table
// and returns them to the page.
export const load: PageServerLoad = async () => {
  const { data } = await supabase
    .from('todo')
    .select('id, name, goal, complete_by')
    // We use order so the most present tasks are first.
    .order('complete_by', { ascending: true })

  return { todos: data }
}
