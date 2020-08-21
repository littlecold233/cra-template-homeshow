// https://github.com/timarney/react-app-rewired
// https://github.com/oklas/react-app-rewire-alias

const path = require('path');
const {alias, configPaths} = require('react-app-rewire-alias')

module.exports = function override(config, env) {
    alias(configPaths('tsconfig.paths.json'))(config)
    return config;
}
