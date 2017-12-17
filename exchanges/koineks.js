'use strict';

const request = require('request');
const TIMEOUT = require('../config').TIMEOUT;

const pairs = [
    'btc_try',
    'ltc_try',
    'eth_try',
    'dash_try',
    'doge_try'
];