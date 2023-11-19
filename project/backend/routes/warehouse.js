const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);


router.get('/', async (req, res) => {

    try {
      const { data, error } = await supabase
        .from("Warehouse")
        .select("*")
      if (error) {
        return res.status(500).json({ error: 'Error fetching from DB' })
      } else {
        //console.log("warehouse ", data)
        return res.send(data)
      }
    } catch (err) {
      return res.status(500).json({ error: "server error" })
    }
  
})

router.get('/filterstates', async (req, res) => {

    try {
      const { data, error } = await supabase
        .from("warehouse_states")
        .select()
      if (error) {
        return res.status(500).json({ error: 'Error fetching from DB' })
      } else {
        console.log("states ", data)
        return res.send(data)
      }
    } catch (err) {
      return res.status(500).json({ error: "server error" })
    }
  
})

module.exports= router;