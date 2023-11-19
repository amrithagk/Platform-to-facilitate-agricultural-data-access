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

module.exports= router;