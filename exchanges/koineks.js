'use strict';

const request = require('request');
const TIMEOUT = require('../config').TIMEOUT;

const pairs = [
    'btc_try',
    'ltc_try',
    'eth_try',
    'dash_try',
    'doge_try',
    'xrp_try',
    'xlm_try',
];

const symbols = {
    'btc': 'BTC',
    'ltc': 'LTC',
    'eth': 'ETH',
    'doge': 'DOGE',
    'dash': 'DASH',
    'xrp': 'XRP',
    'xlm': 'XLM',
};


module.exports = {
    pairs,
    ticker: (pair) => {
        return new Promise((resolve, reject) => {
            if(pairs.includes(pair)) {
                const k = pair.split('_');
                let kraken_pair;
                kraken_pair = k.map((e) => { return symbols[e]; }).join('').toUpperCase();
                request({
                    url: `https://koineks.com/ticker`,
                    timeout: TIMEOUT
                }, (err, res, body) => {
                    if(!err && res.statusCode === 200) {
                        const x = JSON.parse(body)[kraken_pair];
                        resolve({
                            exchange: 'koineks',
                            pair: pair,
                            timestamp: (new Date()).getTime(),
                            ask: parseFloat(x.ask),
                            bid: parseFloat(x.bid)
                        });
                    }
                    else {
                        resolve({
                            exchange: 'koineks',
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
