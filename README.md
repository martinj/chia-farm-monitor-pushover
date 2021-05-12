# Chia Farm Monitor Pushover

cli tool for fonitor chia farm status with notifications sent to pushover

## Install

	npm i -g chia-farm-monitor-pushover

## Usage

```
Usage: chia-monitor-pushover <chia executable> --user xxxx --token xxx

--interval, interval in seconds to check the farm status [60]
--backoff, error backoff factor, multiply increase interval while continuous error [2]
--user, pushover user key
--token, pushover token

```
