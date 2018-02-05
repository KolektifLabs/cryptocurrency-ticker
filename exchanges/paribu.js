'use strict';

const request = require('request');
const TIMEOUT = require('../config').TIMEOUT;

const pairs = [
    'btc_try'
];

const symbols = {
    'btc': 'BTC_TL'
};

module.exports = {
    pairs,
    ticker: (pair) => {
        return new Promise((resolve, reject) => {
            if(pairs.includes(pair)) {
                const k = pair.split('_');
                let paribu_pair = k.map((e) => { return symbols[e]; }).join('').toUpperCase();
                request({
                    url: `https://www.paribu.com/ticker`,
                    timeout: TIMEOUT
                }, (err, res, body) => {
                    if(!err && res.statusCode === 200) {
                        const x = JSON.parse(body)[paribu_pair];
                        resolve({
                            exchange: 'paribu',
                            pair: pair,
                            timestamp: (new Date()).getTime(),
                            ask: parseFloat(x.lowestAsk),
                            bid: parseFloat(x.highestBid)
                        });
                    }
                    else {
                        resolve({
                            exchange: 'paribu',
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