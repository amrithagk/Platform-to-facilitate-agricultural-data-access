const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);

router.post('/', async (req, res) => {
  const { name } = req.body;

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

module.exports = router;
