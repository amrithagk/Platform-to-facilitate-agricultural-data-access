const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = "https://qwpwcrtfydenkqxmpvhg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3cHdjcnRmeWRlbmtxeG1wdmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczNjYyMzcsImV4cCI6MjAxMjk0MjIzN30.XaHdcpwf4YDu7H6Pyq4lyBtTUoOiJEUTqegyMuR07h4";


const supabase = createClient(supabaseUrl, supabaseKey);

// Your custom SQL query
const customQuery = 'SELECT * FROM Farmer';

// Execute the custom query
async function executeCustomQuery() {
  try {
    const { data, error } = await supabase.from('Farmer').sql(customQuery);
    
    if (error) {
      console.error('Error executing query:', error.message);
      return;
    }

    console.log('Query result:', data);
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
}

// Call the function to execute the query
executeCustomQuery();
