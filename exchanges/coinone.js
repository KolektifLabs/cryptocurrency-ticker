'use strict';

const request = require('request');
const TIMEOUT = require('../config').TIMEOUT;

const pairs = [
	'btc_krw',
	'eth_krw',
	'etc_krw',
	'xrp_krw'
];

module.exports = {
	pairs,
	ticker: (pair) => {
		return new Promise((resolve, reject) => {
			if(pairs.includes(pair)) {
				request({
					url: `https://api.coinone.co.kr/orderbook/?currency=${pair.split('_').shift()}&format=json`,
					timeout: TIMEOUT
				}, (err, res, body) => {
					if(!err && res.statusCode === 200) {
						const x = JSON.parse(body);
						resolve({
							exchange: 'coinone',
							pair: pair,
							timestamp: parseInt(x.timestamp),
							ask: parseFloat(x.ask.sort((a, b) => {
								return a.price - b.price;
							}).shift().price),
							bid: parseFloat(x.bid.sort((a, b) => {
								return b.price - a.price;
							}).shift().price)
						});
					}
					else {
						resolve({
							exchange: 'coinone',
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
