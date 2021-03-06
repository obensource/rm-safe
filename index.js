#!/usr/bin/env node

const { tempFolderCheck, rm } = require('./utilities.js')

const arguments = process.argv.filter((argument, i) => i > 1)
tempFolderCheck()

const rmSafe = (arguments) => {
  if (arguments.length === 0) {
    console.log(`rm-safe: no arguments were provided\n`)
    return process.exit(0)
  } else {
    rm(arguments)
  }
}

module.exports = rmSafe(arguments)