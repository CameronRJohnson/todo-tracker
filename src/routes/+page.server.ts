import { supabase } from '$lib/supabaseClient'

// This function loads all of the rows from the todo table
// and returns them to the page.
export async function load() {
  const { data, error } = await supabase.from("todo").select();

  if (error) {
    alert(error);
    return { todos: [] };
  }

  return { todos: data ?? [] };
}
