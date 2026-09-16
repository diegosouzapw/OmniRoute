const { loadBinding } = require('@node-rs/helper')
const path = require('path')

/**
 * __dirname means load binding from current dir
 */
module.exports = loadBinding(__dirname, 'turbovec-node', 'turbovec-node')
