const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);

router.get("/",async(req,res)=>{
    // console.log('erronwef');
    try{
        const { data, error } = await supabase
  .rpc('get_produces')
  .select('*');
  console.log(data);
        // console.log("hiii");
        if(error){
            // console.log(error," in q");
            res.status(404).send({error});
        }
        res.status(200).send({data})
    }
    catch(err){
        // console.log(err)
        res.status(500).send({error:err});
    }
    
})

module.exports = router