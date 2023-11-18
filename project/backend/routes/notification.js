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
        const {data:notclosed,error} = await supabase
        .from('notification_farmer')
        .select('*')
        .eq('closed',0);
        console.log(notclosed);
        if(error){
            res.status(500).send({error:"Not found in Database"});
        }
        const produceIdsNotClosed = notclosed.map(item => item.produce_id);
        if(notclosed)
        {
            const { data: notificationData, error: notificationError } = await supabase
            .rpc('notification_table', {
            p_produce_ids: produceIdsNotClosed,
            });
        }

        // console.log("in all",data)
        if(notificationError){
            res.status(500).send({error:"Not found in Database"});
        }
        res.status(200).send({data})
    }
    catch(err){
        console.log(err)
        res.status(500).send({error:"Code Error"});
    }

});

router.put('/modify',async(req,res)=>{
    try{
        console.log(req.body)
        const {id} = req.body;
        const {data:modifiednotif,error:errnotify} = await supabase
        .from('notification_farmer')
        .update({ closed: 1 })
        .eq('id', id);

        if(errnotify){
            res.status(500).send({error:errnotify});
        }
        else{
            res.status(200).send({message:"Notification closed"})
        }
    }
    catch(error){
        res.status(500).send({error});
    }
});
module.exports = router