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
  if(role === 'Farmer'){
  const { email, password, Name, Date_of_Birth, Id_Proof} = req.body;
  console.log(Email,password,Name,Date_of_Birth,Id_Proof);
  // Uncomment the following code when you are ready to implement the signup logic
  const { data, error } = await supabase
    .from(role)
    .insert(req.body);
    
  if (error) {
    return res.status(500).json({ error: `Error while inserting ${error.message} to the database` });
  }
  return res.status(200).json({ success: 'Sign Up successfull. Avail all the services provided by our website' });
  }
  else{
    const { Email, Password, Name, region, contact} = req.body;
    
    const {data,error} = await supabase
    .from('Dealer')
    .upsert([
      {
      dealer_name:Name,
      region: region,
      Email: Email,
      Password: Password
    }
    ])
    .select();
    console.log(data);
    if(error){
    console.log(error);
      res.status(500).send({error});
    }
    for (const contactName of contact) {
      const { error: contactError } = await supabase
        .from('Dealer_Contact_Details')
        .upsert([
          { dealer_id: data[0].dealer_id, contact: contactName }
        ]);
        if(contactError){
          res.status(500).send({error: contactError});
        }
      }
        res.status(200).send({message:"Successfull"});
      
  }
});

module.exports = router;
