import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://zgeydygfizbsuzhohohp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnZXlkeWdmaXpic3V6aG9ob2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MTc4MjMsImV4cCI6MjA3MTI5MzgyM30.d2FaUj-qr2V-NZXa6HIo8lGA9jRS-0FlikENqgoUSvw';

export const supabase = createClient(supabaseUrl, supabaseKey);