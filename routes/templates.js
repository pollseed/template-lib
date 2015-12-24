'use strict';

let express = require('express');
let here = require('here').here;
let router = express.Router();

const HTML_HEAD = here(/*
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title></title>
<meta charset="utf-8">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="">
*/);

const HTML_IE = here(/*
<!--&#91;if lt IE 9&#93;>
<script src="//cdn.jsdelivr.net/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
<!&#91;endif&#93;-->
<link rel="shortcut icon" href="">
*/);

const HTML_TAIL = here(/*
</head>
<body>
</body>
</html>
*/);

router.get('/html5', (req, res, next) => {
  if (validation(req.query)) {
    let template = '', ie = req.query.ie;
    if (ie == 0 || ie === undefined) {
      template = `${HTML_HEAD}${HTML_TAIL}`;
    } else {
      template = `${HTML_HEAD}${HTML_IE}${HTML_TAIL}`;
    }
    res.json({ "html5-template": template });
  } else {
    writeError(res);
  }
});

function validation(query) {
  // ie
  let ie = query.ie;
  if (ie != 0 && ie != 1 && ie !== undefined) {
    return false;
  }

  return true;
}

function writeError(res) {
  res.json({ "error": "argment error" });
}

module.exports = router;
