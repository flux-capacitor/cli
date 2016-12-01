#!/usr/bin/env node

import chalk from 'chalk'
import meow from 'meow'
import logSymbols from 'log-symbols'
import * as commands from './commands'
import { highlightFirstLine } from './util/cli'

const cli = meow(`
  Usage
    Initialize new flux capacitor
    $ flux init [<target directory>] [--database=<DB connection URL>]

    Dispatch an event
    $ flux dispatch <event type> [<event payload json> [<event meta json>]]
    $ flux dispatch <event json>

    Print my version
    $ flux --version

  Commands
    init        Install a fresh flux capacitor instance in the current directory.
    dispatch    Dispatch a new event (apply a database change).
`)

const [ command, ...args ] = cli.input

if (!command || !commands[ command ]) {
  if (command) {
    console.error(`Unknown command: ${command}`)
  }

  cli.showHelp()
} else {
  const commandMethod = commands[ command ]

  Promise.resolve()
    .then(() => commandMethod(cli.flags, args))
    .catch((error) => console.error(`\n ${logSymbols.error} ${formatError(error)}`))
}

function formatError (error) {
  return highlightFirstLine(
    error.stack,
    (line) => chalk.red(line),
    (line) => chalk.gray(line)
  )
}
