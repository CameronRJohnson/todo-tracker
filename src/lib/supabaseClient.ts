import { createClient } from '@supabase/supabase-js'

// This should normally be in a .env file
// Since our Repository is public, there is no need.

export const supabase = createClient('https://naazzqedfiicelhhljdd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hYXp6cWVkZmlpY2VsaGhsamRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NDE3NTksImV4cCI6MjA2MjQxNzc1OX0.wQB6l6FQh--KQtOFC0t70CPb4oAYSl4oShJJ0DIwvmk')