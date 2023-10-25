const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = 3000; // Your desired port

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase = createClient(
    process.env.PROJECT_URL,
    process.env.API_KEY
);

app.post('/fertilizers', async (req, res) => {
    const { name } = req.body; // Assuming the name is sent in the request body
  
    try {
      const { data, error } = await supabase
        .from('your_table_name')
        .select('*')
        .eq('name', name);
  
      if (error) {
        return res.status(500).json({ error: 'Error searching the database.' });
      }
  
      if (data && data.length > 0) {
        return res.json(data);
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
