# Summary

## Get Started
```.sh
git clone git@github.com:pollseed/template-lib.git
cd template-lib
npm install -g express-generator node-dev
npm install

node-dev ./bin/www
```

# API

## Template

### Get HTML5

```
GET /html5
```
#### Parameters

|Name|Type|Description|
|:--:|:--:|:--:|
|ie|string|The IE-tag availability.|

#### Example

```
{
    "html5-template": "<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title></title>
<meta charset="utf-8">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href=""><!--&#91;if lt IE 9&#93;>
<script src="//cdn.jsdelivr.net/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
<!&#91;endif&#93;-->
<link rel="shortcut icon" href=""></head>
<body>
</body>
</html>"
}
```

### Get DDL(MySQL)

```
GET /mysql_ddl/:type
```

#### Type

|Name|Description|
|:--:|:--:|
|schema|schema DDL.|
|create|create DDL.|
|insert|insert DML.|
|update|update DML.|
|column|update DML.|
|index|update DML.|

#### Parameters

|Name|Type|Description|
|:--:|:--:|:--:|
|schema|string|schema name for schema-type.|
|collation|string|collation name.|
|table|string|table name for CRUD-type.|

#### Example

```
{
    "mysql-ddl-template": "CREATE TABLE test (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `name` VARCHAR(45) NULL COMMENT '',
  `create_date` DATETIME NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;"
}
```
