envconfik
-------

load config from env

### Installation

```
npm install envconfik
```

### Usage

```js
var defaultConfig = {
  mysqlHost: 'test',
  mysqlPort: 3000,
  price: 10.02,
  isReady: false
};

var config = envConf(defaultConfig, {prefix: 'app'});
```
