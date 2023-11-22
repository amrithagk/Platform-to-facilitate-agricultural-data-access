const express = require('express');
const { createClient } = require('@supabase/supabase-js');
// require('../dotenv').config();
const router = express.Router();
const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);

router.get('/newproducelist', async (req, res) => {
  let pid = [];
  try {
    const {data, error} = await supabase
    .from("notification_dealer")
    .select('*');

    if (error) {
      console.log(error)
    } else {
      
      if (data.length > 0)  {
        data.forEach(element => {
          console.log(element.Produce_id);
          pid.push(element.Produce_id);
        });
      } 
      
    }
  } catch (error) {
    console.log(error);
  }

  if (pid.length > 0) {
    try {
      const {data, error} = await supabase
      .from("Produce")
      .select('*')
      .in('Produce_id', pid);
  
      if (error) {
        console.log(error);
      } else {
        console.log("notifi", data);
        res.send(data);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send('No notifications');
  }
  
})

router.get("/all", async (req, res) => {
    try {
      const { data: notclosed, error } = await supabase
        .from('notification_dealer')
        .select('*')
        .eq('closed', 0);
  
      console.log("data from notification page=", notclosed);
  
      if (error) {
        return res.status(500).send({ error: "Not found in Database" });
      }
  
      if (!notclosed || notclosed.length === 0) {
        console.log("No notifications found");
        return res.status(404).send({ error: "No notifications found" });
      }
  
      const produceIdsNotClosed = notclosed.map(item => item.produce_id);
  
      const { data: notificationData, error: notificationError } = await supabase
        .rpc('notification_table', {
          p_produce_ids: produceIdsNotClosed,
        });
  
      if (notificationError) {
        return res.status(500).send({ error: "Not found in Database" });
      }
  
      // Send the response only once
      res.status(200).send({ data: notificationData });
    } catch (err) {
      console.log("error in notification page=", err);
      res.status(500).send({ error: err.message }); // Only send the error message
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