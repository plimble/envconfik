var expect = require('chai').expect;
var envConf = require('./index');


describe('env conf', function(){
  describe('set env config', function(){
    process.env.MYSQL_HOST = 'mysql';
    process.env.MYSQL_PORT = '4000';
    process.env.PRICE = '40.01';
    process.env.IS_READY = 'true';

    it('should override config from env', function(){
      var defaultConfig = {
        mysqlHost: 'test',
        mysqlPort: 3000,
        price: 10.02,
        isReady: false
      };

      var config = envConf(defaultConfig);
      expect(config).deep.equal({
        mysqlHost: 'mysql',
        mysqlPort: 4000,
        price: 40.01,
        isReady: true
      });
    });
  });

  describe('set env config with prefix', function(){
    process.env.TEST_MYSQL_HOST = 'mysql';
    process.env.TEST_MYSQL_PORT = '4000';
    process.env.TEST_PRICE = '40.01';
    process.env.TEST_IS_READY = 'true';

    it('should override config from env', function(){
      var defaultConfig = {
        mysqlHost: 'test',
        mysqlPort: 3000,
        price: 10.02,
        isReady: false
      };

      var config = envConf(defaultConfig, {prefix: 'test'});
      expect(config).deep.equal({
        mysqlHost: 'mysql',
        mysqlPort: 4000,
        price: 40.01,
        isReady: true
      });
    });
  });
});
