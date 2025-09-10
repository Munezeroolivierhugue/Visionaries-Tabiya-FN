import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wwrhzyrvnpgmnlumpygh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3cmh6eXJ2bnBnbW5sdW1weWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MTM4MTQsImV4cCI6MjA3MjM4OTgxNH0.TROd599WsLsopG5v8R5fd8YSIJpF7yHgvPdiS1l_Xo4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);