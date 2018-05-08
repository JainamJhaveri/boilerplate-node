import * as express from 'express';

let router = express.Router();

router.get('/login', function (req, res, next) {

    return res.json({});

});

module.exports = router;
