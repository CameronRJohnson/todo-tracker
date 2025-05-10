import { supabase } from '$lib/supabaseClient'
import type { PageParentData } from './$types';

export const load: PageParentData = async () => {
const { data , error} = await supabase
  .from('todo')
  .select('id, name, goal, complete_by')
  .order('complete_by', { ascending: true });

  if (error) {
  console.error('Error loading todos:', error.message);
  return { todos: [] };
}

return { todos: data ?? [] };
};
