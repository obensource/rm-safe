#!/usr/bin/env node

/*
 * When using `rm`:
 * - alias rm to this function / install a node module globally installation should add the alias ?
 *
 * check if a temp dir (echo $TMPDIR) in the stock unix temp dir exists, if not – make it - $HOME + /temp
 *
 * sync copy whichever files are listed as arguments to temp folder - process.argv
 *
 * bubble up errs if there are any and kill the process if encountered - console.error err
 *
 * if cp exits w/o errors, then rm the files listed as arguments
 *
 * When using rm -r or -f
 * make it double check before proceeding
 * - basic sync dialog: print check, receive input, then do the action accordingly (continue or stop)
 * */

const { tempFolderCheck, rm } = require('./utilities.js')

const arguments = process.argv.filter((argument, i) => i > 1)
tempFolderCheck()

// Case: no arguments
if (arguments.length === 0) {
  console.log(`rm-safe: no arguments were provided\n`)
  return process.exit(0)
} else {
  // Main program
  rm(arguments)
}