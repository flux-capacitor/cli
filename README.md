# Flux Capacitor - CLI

[![Build Status](https://travis-ci.org/flux-capacitor/cli.svg?branch=master)](https://travis-ci.org/flux-capacitor/cli)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/flux-capacitor-cli.svg)](https://www.npmjs.com/package/flux-capacitor-cli)

Command line interface (CLI) tool for the [Flux Capacitor](https://github.com/flux-capacitor/flux-capacitor). Utility to set up, administrate and debug flux capacitor stores.


**Not yet released.**


## Usage

```sh
# Set up a new flux capacitor instance
flux init [<target directory>] [--database <connection url>]

# Dispatch an event
flux dispatch <event type | complete JSON event> [--payload <JSON payload>] [--meta <JSON meta>] [--raw]

# Show event log
flux log [[<event id>]..[<event id>]] [--count <int>] [--raw]

# Show some event
flux show <event id> [--raw]
```


## Flux Capacitor

Find the main documentation here 👉 [Flux Capacitor](https://github.com/flux-capacitor/flux-capacitor)


## License

Released under the terms of the MIT license.
