'use strict';

let express = require('express');
let here = require('here').here;
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Template-Lib' });
});

module.exports = router;
