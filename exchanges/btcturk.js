'use strict';

const request = require('request');
const TIMEOUT = require('../config').TIMEOUT;

const pairs = [
    'btc_try',
    'eth_try',
    'eth_btc'
];


const pairSymbols = {
    'btc_try': 'BTCTRY',
    'eth_try': 'ETHTRY',
    'eth_btc': 'ETHBTC'
};

module.exports = {
    pairs,
    ticker: (pair) => {
        return new Promise((resolve, reject) => {
            if(pairs.includes(pair)) {
                let pairSymnol = pairSymbols[pair];
                request({
                    url: `https://www.btcturk.com/api/ticker?pairSymbol=${pairSymnol}`,
                    timeout: TIMEOUT
                }, (err, res, body) => {
                    if(!err && res.statusCode === 200) {
                        const x = JSON.parse(body);
                        resolve({
                            exchange: 'btcturk',
                            pair: pair,
                            timestamp: (new Date()).getTime(),
                            ask: parseFloat(x.ask),
                            bid: parseFloat(x.bid)
                        });
                    }
                    else {
                        resolve({
                            exchange: 'btcturk',
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