const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { Route } = require('react-router-dom');
// require('../dotenv').config();
const router = express.Router();
const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);
router.post("/",async(req,res)=>{
  console.log("hii")
    try {
        // Replace with the actual dealer email
        const {produceID,quantity,offerAmount,email,date} = req.body;
        console.log(req.body)
        // Retrieve Dealer_id using CTE
        const response = await supabase
          .from('Dealer')
          .select('dealer_id')
          .eq('email',email);
        const dealer_data = response.data[0]
        if(response.error){
          res.status(500).send({error:dealerError})
        }
        console.log(date)
        const { data, error } = await supabase
        .from('Purchase_record')
        .upsert([
          {
            Dealer_ID: dealer_data.dealer_id,
            Produce_ID: produceID,
            Unit_price: offerAmount,
            Date:date,
            Quantity: quantity
          },
        ]);
        // Upsert data into the 'notification_farmer' table
       
    
        if (error) {
          console.error('Error inserting data:', error.message);
          res.status(500).send({error});
        } else {
          console.log('Data inserted successfully:', data);
          res.status(200).send({message:"purchase waiting"})
        }
      } catch (err) {
        console.error('Error:', err.message);
        res.status(500).send({error:err});
      }

})
module.exports = router;