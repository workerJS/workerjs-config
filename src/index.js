// Singelton for config

const config = {
	_data: {},
	_globals: {},
	setGlobals: (globals) => {
		config._globals = globals
	},
	setDefaults: (defaults) => {
		Object.keys(defaults).forEach((key) => {
			if(config.get(key) === undefined){
				config.set(key, defaults[key]);
			}
		});
	},
	set: (name, value) => {
		config._data[name] = value;
	},
	get: (name) => {
		if(config._data[name] === undefined){
			if(process.env[name] !== undefined){
				config.set(name, process.env[name]);
			} else if(config._globals !== undefined){
				config.set(name, config._globals[name]);
			}
		}

		return config._data[name];
	},
	getAll: () => {
		return config._data;
	}
};

const globalConfig = require("../config.json");
config.setGlobals(globalConfig);

module.exports = config; 

