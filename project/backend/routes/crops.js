const express = require('express');
const { createClient } = require('@supabase/supabase-js');
// require('../dotenv').config();
const router = express.Router();
const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);

router.get("/all",async(req,res)=>{
    try{
        const {data,error} = await supabase
        .from('Crop')
        .select('*');
        if(error){
            res.status(500).send({error:"Not found in Database"});
        }
        res.status(200).send({data})
    }
    catch(err){
        res.status(500).send({error:"Code Error"});
    }

})
router.get("/types",async(req,res)=>{
    try{
        const {data,error} = await supabase
        .from('distinct_types')
        .select();
        console.log(data);
        if(error){
            res.status(500).send({error:"Not found in Database"});
        }
        res.status(200).send({data})
    }
    catch(err){
        console.log(err);
        res.status(500).send({error:"Code Error"});
    }

})
router.get("/seasons",async(req,res)=>{
    try{
        const {data,error} = await supabase
        .from('distinct_season')
        .select();
        console.log(data);
        if(error){
            res.status(500).send({error:"Not found in Database"});
        }
        res.status(200).send({data})
    }
    catch(err){
        console.log(err);
        res.status(500).send({error:"Code Error"});
    }

})
router.get("/soil_type",async(req,res)=>{
    try{
        const {data,error} = await supabase
        .from('distinct_soil_type')
        .select();
        console.log(data);
        if(error){
            res.status(500).send({error:"Not found in Database"});
        }
        res.status(200).send({data})
    }
    catch(err){
        console.log(err);
        res.status(500).send({error:"Code Error"});
    }

})
router.get("/water_req",async(req,res)=>{
    try{
        const {data,error} = await supabase
        .from('distinct_water_req')
        .select();
        console.log(data);
        if(error){
            res.status(500).send({error:"Not found in Database"});
        }
        res.status(200).send({data})
    }
    catch(err){
        console.log(err);
        res.status(500).send({error:"Code Error"});
    }

})
module.exports = router
