const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);

router.post('/:role', async (req, res) => {
  const role = req.params.role;
  const { email, password } = req.body;
  console.log(req.body)

  try {
    const { data, error } = await supabase
      .from(role)
      .select('email', 'password')
      .eq('email', email);

    if (error) {
      return res.status(500).json({ error: 'Error searching the database.' });
    }

    if (password == data.password) {
      return res.status(200).send('Login Successfull');
    } else {
      return res.status(401).send('Password is not matching!!!:(');
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
