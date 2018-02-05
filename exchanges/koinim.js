'use strict';

const request = require('request');
const TIMEOUT = require('../config').TIMEOUT;

const pairs = [
    'btc_try'
];


module.exports = {
    pairs,
    ticker: (pair) => {
        return new Promise((resolve, reject) => {
            if(pairs.includes(pair)) {
                // since this one supports only BTC to TRY, there is no need for splitting the pair
                request({
                    url: `https://koinim.com/ticker/`,
                    timeout: TIMEOUT
                }, (err, res, body) => {
                    if(!err && res.statusCode === 200) {
                        const x = JSON.parse(body);
                        resolve({
                            exchange: 'koinim',
                            pair: pair,
                            timestamp: (new Date()).getTime(),
                            ask: parseFloat(x.ask),
                            bid: parseFloat(x.bid)
                        });
                    }
                    else {
                        resolve({
                            exchange: 'koinim',
                            pair: pair,
                            timestamp: undefined,
                            ask: undefined,
                            bid: undefined
                        });
                    }
                });
            }
            else {
                reject('pair is not supported');
            }
        });
    }
};