const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { Route } = require('react-router-dom');
// require('../dotenv').config();
const router = express.Router();
const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);
router.get("/all",async(req,res)=>{
    try{
        const {data,error} = await supabase
        .from('Pesticide')
        .select('*');
        console.log("in all",data)
        if(error){
            res.status(500).send({error:"Not found in Database"});
        }
        res.status(200).send({data})
    }
    catch(err){
        console.log(err)
        res.status(500).send({error:"Code Error"});
    }

});
router.get("/pests",async(req,res)=>{
    try{
        const {data,error} = await supabase
        .rpc('get_unique_pests')
        .select('*');
        console.log("pests=",data);
        if(error){
            res.status(500).send({error:"Not found in Database"});
        }
        res.status(200).send({data})
    }
    catch(err){
        console.log(err);
        res.status(500).send({error:err});
    }

})
module.exports = router;