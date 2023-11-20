const express = require('express');
const { createClient } = require('@supabase/supabase-js');
// require('../dotenv').config();
const router = express.Router();
const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);

router.get('/', async (req, res) => {

  try {
    const { data, error } = await supabase
      .from('totals')
      .select('*');
    console.log(data)
    if (error) {
      return res.status(500).send({ error: 'Error searching the database.' });
    }

    if (data) {
      return res.status(200).send({data});
    } else {
      return res.status(404).send({ message: 'No matching records found.' });
    }
  } catch (err) {
    return res.status(500).send({ error: 'Server error.' });
  }
});

module.exports = router;
