const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 3000; // Your desired port

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const supabase = createClient(
    "https://qwpwcrtfydenkqxmpvhg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3cHdjcnRmeWRlbmtxeG1wdmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczNjYyMzcsImV4cCI6MjAxMjk0MjIzN30.XaHdcpwf4YDu7H6Pyq4lyBtTUoOiJEUTqegyMuR07h4"
);


app.post('/fertilizers', async (req, res) => {
  const name = req.body.name; // Assuming the name is sent in the request body
  console.log(name)
  try {
      //const user = supabase.auth.user();
      const { data, error } = await supabase
        .from('Crop')
        .select('*')
        .eq("Name", name);
  
      if (error) {
        return res.status(500).json({ error: 'Error searching the database.' });
      }
  
      if (data && data.length > 0) {
        console.log("data", data)
        return res.send(data);
      } else {
        return res.status(404).json({ message: 'No matching records found.' });
      }
    } catch (err) {
      return res.status(500).json({ error: 'Server error.' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
/* export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;
        try {
            await supabase.from('Fertilizers').select([{ name: name, email: email, message: message }]);
            return res.status(201).json({ message: "Message sent successfully" });
        } catch (error) {
            console.log("Error", error);
            return res.status(500).json({ message: "There was an issue sending your message." })
        }
    } else {
        return res.status(405).end()
    }
}

const tableListener = supabase
  .from('your_table_name')
  .on('INSERT', (payload) => {
    console.log('New row inserted:', payload.new);
  })
  .subscribe(); */

  // Start the Express.js server
