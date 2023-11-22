const express = require('express');
const { createClient } = require('@supabase/supabase-js');
// require('../dotenv').config();
const router = express.Router();
const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);

router.get('/:id', async (req, res) => {
  const dealer_mail = req.params.id
  console.log(dealer_mail)

  try {
    const { data, error } = await supabase
      .rpc('get_totals',{
        deal: dealer_mail
      });

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
