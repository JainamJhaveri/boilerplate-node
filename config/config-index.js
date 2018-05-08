const fs = require('fs');
const path = require('path');
const NODE_ENV = process.env.NODE_ENV;
let configBuffer = null;

switch (NODE_ENV) {
    case 'prod':
        configBuffer = fs.readFileSync(path.resolve(__dirname, 'env-prod.json'), 'utf-8');
        break;
    case 'dev':
        configBuffer = fs.readFileSync(path.resolve(__dirname, 'env-staging.json'), 'utf-8');
        break;
    default:
        configBuffer = fs.readFileSync(path.resolve(__dirname, 'env-default.json'), 'utf-8');
}

let configIndex = JSON.parse(configBuffer);
module.exports = configIndex;