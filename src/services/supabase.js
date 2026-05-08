import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ynzquglxhuuadxkpmsnm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluenF1Z2x4aHV1YWR4a3Btc25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNjQ3MDYsImV4cCI6MjA5Mzc0MDcwNn0.HPgUG3kg4Nt3l6CexnZbT4_uuAGF_VliDvkb-mChkfI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);