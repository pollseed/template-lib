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
  "ie": 1
}
```
