const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 3000; // Server port

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);

//routes
const fertilizersRoute = require('./routes/fertilizers');
const incentivesRoute = require('./routes/incentives');
const warehouseRoute = require('./routes/warehouse');
const farmerDashboardRoute = require('./routes/farmerdashboard');

app.use('/fertilizers', fertilizersRoute)
app.use('/incentives', incentivesRoute)
app.use('/warehouse', warehouseRoute)
app.use('/farmerdashboard', farmerDashboardRoute)


app.post('/crops', async (req, res) => {
  const name = req.body.name;
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