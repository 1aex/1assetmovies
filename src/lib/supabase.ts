import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cbgqjdrwffppgxbnsvds.supabase.co"; // Replace with your Supabase URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiZ3FqZHJ3ZmZwcGd4Ym5zdmRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMDM2NDIsImV4cCI6MjA2Mjc3OTY0Mn0.9jEd0YrX8huojN96XOVNfGNjweH_mdJPJcWt3o7RJoM"; // Replace with your Supabase Key

export const supabase = createClient(supabaseUrl, supabaseKey);
