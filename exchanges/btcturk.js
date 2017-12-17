'use strict';

const request = require('request');
const TIMEOUT = require('../config').TIMEOUT;

const pairs = [
    'btc_try',
    'eth_try',
    'eth_btc'
];