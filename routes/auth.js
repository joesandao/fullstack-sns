const router = require('express').Router();

router.get('/',(req,res) => {
    res.send('auth router');
});

module.exports = router;