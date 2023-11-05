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
  process.env.PROJECT_URL,
  process.env.API_KEY
);

//console.log(supabase, "supa client")

app.post('/crops', async (req, res) => {
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

app.post('/fertilizers', async (req, res) => {
  const name = req.body.name; // Assuming the name is sent in the request body
  console.log(name)
  try {
    //const user = supabase.auth.user();
    const { data, error } = await supabase
      .from('Requires')
      .select('*')
      .filter('Crop.Scientific_Name', 'eq', 'Requires.Scientific_Name') // Condition for the join
      .join('Crop', { type: 'inner' })
      .eq('Name', name)


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

app.get('/dashboard', async (req, res) => {
  const farmerID = req.body.farmerid;
  try {
    const { data, error } = await supabase
      .from('Produce')
      .select('*')
      .filter('Farmer_id', 'eq', `${farmerID}`)
    if (error) {
      return res.status(500).json({ error: 'Error fetching from DB' })
    } else {
      return res.send(data)
    }
  } catch (err) {
    return res.status(500).json({ error: "server error" })
  }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
