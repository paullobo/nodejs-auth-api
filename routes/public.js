var express = require('express');
var router = express.Router();

router.get('/status', (req,res)=>{
    return res.status(200).json({
        status: 'success',
        ok: true,
        code: 200,
        message: 'Server is there for your service',
    })
});


module.exports = router;