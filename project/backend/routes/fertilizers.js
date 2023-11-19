const express = require('express');
const { createClient } = require('@supabase/supabase-js');
// require('../dotenv').config();
const router = express.Router();
const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);


router.post('/', async (req, res) => {
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

  module.exports = router;