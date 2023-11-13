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

app.post('/fertilizers', async (req, res) => {
  const name = req.body.name;
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

app.post('/dashboard', async (req, res) => {
  const farmerId = req.body.farmerId;
  console.log("farmerid = ", farmerId)

  try {
    const { data, error } = await supabase
      .from('Produce')
      .select('*')
      .filter('Farmer_id', 'eq', `${farmerId}`)
    if (error) {
      return res.status(500).json({ error: 'Error fetching from DB' })
    } else {
      console.log("data", data)
      return res.send(data)
    }
  } catch (err) {
    return res.status(500).json({ error: "server error" })
  }
})

app.post('/producedetails', async (req, res) => {

  let sc_name;

  try {
    const { data, error } = await supabase
      .from('Crop')
      .select('Scientific_Name')
      .eq("Name", req.body.Crop_Name);

    if (error) {
      return res.status(500).json({ error: 'Error searching crop name.' });
    }

    if (data && data.length > 0) {
      sc_name = data;
    } else {
      return res.status(404).json({ message: 'No matching records found.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error.' });
  }

  let details = req.body;
  delete details.Crop_Name;
  details.Scientific_Name = sc_name[0].Scientific_Name;
  const dataToInsert = details;
  console.log("new produce details", dataToInsert);

  try {
    const { error } = await supabase
      .from('Produce')
      .insert(dataToInsert)

    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Data inserted successfully:', data);
    }
  } catch (error) {
    console.error('Error inserting data:', error.message);
  }

})

app.get('/incentives', async (req, res) => {

  try {
    const { data, error } = await supabase
      .from("Incentive_Schemes")
      .select("*")
    if (error) {
      return res.status(500).json({ error: 'Error fetching from DB' })
    } else {
      console.log("data", data)
      return res.send(data)
    }
  } catch (err) {
    return res.status(500).json({ error: "server error" })
  }

})

app.post('/notifications', async (req, res) => {

  const role = req.body.role;
  const id = req.body.userId;

  let table_name, col_name;
  switch (role) {
    case 'Farmer':
      table_name = 'notification_farmer';
      col_name = 'Farmer_id';
      break;
    case 'Dealer':
      table_name = 'notification_dealer';
      col_name = 'dealer_id';
      break;
    default:
      table_name = '';
      col_name = '';
  };

  try {

    const { notificationData, error } = await supabase
      .from(table_name)
      .select('*')
      .filter('Purchase_record.Dealer_ID', 'eq', 'notification_farmer.dealer_id')
      .filter('Purchase_record.Produce_ID', 'eq', 'notification_farmer.produce_id')
      .join('Purchase_record', { type: 'inner' })
      .eq(col_name, id);

    if (error) {
      res.status(500).json({ "Error fetching data": error })
    }
    else {
      console.log("notification data", notificationData)
  }
 } catch {
    res.status(500).json({ error: "Server error" })
  }

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
