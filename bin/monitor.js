#!/usr/bin/env node
'use strict';

const fs = require('fs');
const monitor = require('../');
const argv = require('minimist')(process.argv.slice(2));

const [chia] = argv._;
const {user, token, interval = 60, backoff = 2} = argv;
if (!chia || !user || !token) {
	usage();
}

try {
	fs.accessSync(chia); // eslint-disable-line no-sync
} catch (err) {
	console.error(`Unable to access chia executable at: ${chia}`);
	usage();
}

console.log();
console.log(`Starting monitor chia farm status, interval ${interval}, backoff ${backoff}...`);
monitor(chia, user, token, interval * 1000, backoff, (msg) => console.log(new Date(), msg));
console.log();

function usage() {
	console.log();
	console.log('Usage: chia-monitor-pushover <chia executable> --user xxxx --token xxx');
	console.log();
	console.log('--interval, interval in seconds to check the farm status [60]');
	console.log('--backoff, error backoff factor, multiply increase interval while continuous error [2]');
	console.log('--user, pushover user key');
	console.log('--token, pushover token');
	console.log();
	process.exit();
}
