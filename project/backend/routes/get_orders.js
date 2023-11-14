const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);
router.get("/:key", async (req, res) => {
    // console.log('erronwef');
    const param = req.params.key;
    try {
        const { data, error } = await supabase
        .rpc('get_orders', { email_param: param })
        .select('*');


        console.log(data);
        
        if (error) {
            console.log(error, " in q");
            res.status(500).send({ error });
        } else {
            res.status(200).send({ data });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err });
    }
})
 module.exports = router