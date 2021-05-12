'use strict';
const Monitor = require('chia-farm-monitor');
const Push = require('pushover-notifications');

// eslint-disable-next-line max-params
function start(chia, user, token, interval = 60000, errorBackOffFactor = 2, logFn) {
	const api = new Push({user, token});
	const mon = new Monitor(chia, {interval, errorBackOffFactor});

	mon.on('farmError', (msg) => report(api, msg, logFn));
	mon.on('farmRestored', () => report(api, 'Farm has recovered from previous error', logFn));
	mon.on('error', async (err) => report(api, `Monitor error: ${err.message}`, logFn));

	mon.start();
}

function report(api, msg, logFn) {
	logFn && logFn(msg);
	const payload = {
		message: msg,
		title: 'Chia Farm Monitor',
		priority: 1
	};

	api.send(payload, (err, result) => {
		if (err) {
			return console.error(err);
		}
	});
}

module.exports = start;
