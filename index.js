
function toUnderscore(str) {
	return str.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
};


function getEnvKey(prefix, configKey) {
  if (prefix && prefix !== '') {
    return prefix + '_' + toUnderscore(configKey).toUpperCase();
  }

  return toUnderscore(configKey).toUpperCase();
}

function convertType(defaultValue, valueStr) {
	switch (typeof defaultValue) {
		case 'string':
			return valueStr;
		case 'number':
			if (Number.isInteger(defaultValue)) {
					return parseInt(valueStr);
			}
			return parseFloat(valueStr);
		case 'boolean':
			if (valueStr === 'true' || valueStr === 'yes') {
				return true;
			}
			return false;
		default:
			return valueStr;
	}
}

var exports = module.exports = function(defaultConfig, options) {
  var config = {};

  var prefix = '';
  if (options && options.prefix) {
      prefix = toUnderscore(options.prefix).toUpperCase();
  }

  for (var configKey in defaultConfig) {
    if (defaultConfig.hasOwnProperty(configKey)) {
      var envConfig = process.env[getEnvKey(prefix, configKey)];
      if (envConfig) {
        config[configKey] = convertType(defaultConfig[configKey], envConfig);
      } else {
        config[configKey] = defaultConfig[configKey];
      }
    }
  }

  return config;
}
