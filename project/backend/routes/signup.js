const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);

router.post('/:role', async (req, res) => {
  console.log(req.body);
  const role = req.params.role;
  const { email, password, Name, Date_of_Birth, Id_Proof} = req.body;
  console.log(email,password,Name,Date_of_Birth,Id_Proof);
  // Uncomment the following code when you are ready to implement the signup logic
  const { data, error } = await supabase
    .from(role)
    .insert(req.body);
  if (error) {
    return res.status(500).json({ error: `Error while inserting ${error.message} to the database` });
  }
  return res.status(200).json({ success: 'Sign Up successfull. Avail all the services provided by our website' });
});

module.exports = router;
