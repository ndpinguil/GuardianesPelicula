import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rrjjtjfiqrwmtekmarvq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyamp0amZpcXJ3bXRla21hcnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzNjAwMTMsImV4cCI6MjAzNjkzNjAxM30.jJ-zmDOaKf5MeFbyXQCIZx69G65ZTIOmw4ENY4sMiEE';

export const supabase = createClient(supabaseUrl, supabaseKey);
