import { supabase } from '$lib/supabaseClient'
import type { PageServerLoad } from './$types'

// This function loads all of the rows from the todo table
// and returns them to the page.

export const load: PageServerLoad = async () => {
  const { data, error } = await supabase
    .from('todo')
    .select('id, name, goal, complete_by')
    .order('complete_by', { ascending: true });

  if (error) {
    console.error('Error loading todos:', error.message);
    return { todos: [] };
  }

  return {
    todos: data ?? []
  };
};
