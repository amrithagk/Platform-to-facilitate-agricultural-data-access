const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);

router.post('/', async (req, res) => {
    const farmerId = req.body.currentId;
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
  
  router.post('/producedetails', async (req, res) => {
  
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
    let inserted = false;
    try {
      const { error } = await supabase
        .from('Produce')
        .insert(dataToInsert)
  
      if (error) {
        console.error('Error inserting data:', error.message);
      } else {
        console.log('Data inserted successfully:', data);
        inserted = true;
      }
    } catch (error) {
      console.error('Error inserting data:', error.message);
    }

  
  })

router.post('/getuserid', async (req, res) => {
  console.log("email", req.body.emailId);
    try {

        const query = supabase
            .from('Farmer')
            .select('Farmer_id')
            .eq('Email', req.body.emailId);

        const {data, error} = await query
        if (error) {
            return res.status(500).json({ error: 'Error getting user id'});
        } else {
            console.log("farmer_id", data);
            return res.send(data);
        }
    } catch {
        return res.status(500).json({ error: "Error"});
    }
})

router.post('/notifications', async (req, res) => {

  const role = req.body.role;
  const id = req.body.currentId;
  console.log("role and curId", role, id);

  try {

    const { data, error } = await supabase
      .rpc('get_farmer_notifications', {farmer_id: id});

    if (error) {
      res.status(500).json({ "Error fetching data": error })
    }
    else {
      console.log("notification data", data)
      return res.send(data);
  }
 } catch {
    res.status(500).json({ error: "Server error" })
  }

})

router.post('/action', async (req, res) => {

  const decision = req.body.decision;
  const purchaseId = req.body.purchaseId;
  console.log("decision", decision, purchaseId);

  try {

    const { data, error } = await supabase
      .from('Purchase_record')
      .update({deal_status: decision})
      .eq('purchase_id', purchaseId);

    if (error) {
      res.status(500).json({ "Error fetching data": error })
    }
    else {
      console.log("notification data", data)
      return res.send(data);
  }
 } catch {
    res.status(500).json({ error: "Server error" })
  }

  if (decision === 'Accepted') {
    const produceId = req.body.produceId;
    
  }

})


module.exports = router;