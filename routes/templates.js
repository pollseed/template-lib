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
  if (validationIe(req.query)) {
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

const DDL_SCHEMA = here(/*
CREATE SCHEMA <__new_schema__> DEFAULT CHARACTER SET <__collation__>;
*/);

const DDL_CREATE = here(/*
CREATE TABLE <__new_table__> (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `name` VARCHAR(45) NULL COMMENT '',
  `create_date` DATETIME NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = <__collation__>;
*/);

const DML_INSERT = here(/*
INSERT INTO <__new_table__> (`name`, `create_date`) VALUES ('hoge', now());
*/);

const DML_UPDATE = here(/*
UPDATE <__new_table__> SET `name`='fuga', `create_date`=now() WHERE `id`='1';
*/);

const DDL_ADD_COLUMN = here(/*
ALTER TABLE <__new_table__>
ADD COLUMN `update_date` DATETIME NULL DEFAULT NULL COMMENT '' AFTER `create_date`;
*/);

const DDL_ADD_INDEX = here(/*
ALTER TABLE <__new_table__>
ADD INDEX `id_name_idx` (`id` ASC, `name` ASC)  COMMENT '';
*/);

router.get('/mysql_ddl/:type', (req, res, next) => {
  let type = req.params.type, template = '';
  switch (type) {
    case 'schema':
      template = DDL_SCHEMA.replace(/<__new_schema__>/g, req.query.schema).replace(/<__collation__>/g, req.query.collation);
      break;
    case 'create':
      template = replace_new_table(DDL_CREATE, req).replace(/<__collation__>/g, req.query.collation);
      break;
    case 'insert':
      template = replace_new_table(DML_INSERT, req);
      break;
    case 'update':
      template = replace_new_table(DML_UPDATE, req);
      break;
    case 'column':
      template = replace_new_table(DDL_ADD_COLUMN, req);
      break;
    case 'index':
      template = replace_new_table(DDL_ADD_INDEX, req);
      break;
    default:
      break;
  }
  res.json({ "mysql-ddl-template": template });
});

function replace_new_table(target, req) {
  return target.replace(/<__new_table__>/g, req.query.table);
}

function validationIe(query) {
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
