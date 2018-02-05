'use strict';

const bithumb = require('./exchanges/bithumb');
const coinone = require('./exchanges/coinone');
const korbit = require('./exchanges/korbit');
const kraken = require('./exchanges/kraken');
const poloniex = require('./exchanges/poloniex');
const liqui = require('./exchanges/liqui');
const gdax = require('./exchanges/gdax');
const gemini = require('./exchanges/gemini');
const lykke = require('./exchanges/lykke');
const bitfinex = require('./exchanges/bitfinex');
const bitstamp = require('./exchanges/bitstamp');
const uphold = require('./exchanges/uphold');
const koinim = require('./exchanges/koinim');
const koineks = require('./exchanges/koineks');
const paribu = require('./exchanges/paribu');
const btcturk = require('./exchanges/btcturk');

const exchanges = {
	bithumb,
	coinone,
	korbit,
	kraken,
	poloniex,
	liqui,
	gdax,
	gemini,
	lykke,
	bitfinex,
	bitstamp,
	uphold,
	koinim,
	koineks,
	paribu,
	btcturk
};

function availableExchanges() {
	return Promise.resolve(Object.keys(exchanges));
}

function availablePairs(exchange) {
	return availableExchanges().then((exchanges) => {
		return exchanges.includes(exchange) ? Promise.resolve() : Promise.reject();
	}).then(() => {
		return Promise.resolve(exchanges[exchange].pairs);
	});
}

function ticker(exchange, pair) {
	return exchanges[exchange].ticker(pair);
}

module.exports = {
	ticker,
	availableExchanges,
	availablePairs
};
