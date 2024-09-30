import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ikcgmuvkxbvqayyfjqhw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrY2dtdXZreGJ2cWF5eWZqcWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxMzY3NzUsImV4cCI6MjAzOTcxMjc3NX0.jQCKlPzct-dnwRNNqmbu2L92HTb7g5QE5z6JXHKH9QQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
