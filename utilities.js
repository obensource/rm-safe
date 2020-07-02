const  inquirer = require('inquirer')
const fs = require('fs')
const { execSync } = require('child_process')

// Make a temp folder if one doesn't exist
const tempFolderCheck = () => {
  if (!process.env.TMPDIR) {
    const tmpDir = process.env.HOME.concat(`/temp`)
    process.env.TMPDIR = tmpDir
  
    console.error(`\nError: rm-safe did not find a local temporary directory, creating...`)
    execSync(`mkdir $HOME/temp`)
    console.log(`...a new directory for storing temporary files was created at: ${tmpDir}\n`)
  }
}

const rm = (arguments) => {
  arguments.forEach((argument, i) => {
    let argumentStats = fs.statSync(argument)

    // Verify use of `rm -rf` before removing a directory
    if (argument === '-r' || argument === '-Rf' || argument === '-rf') {
      deleteDirectory(arguments, argument)
      // Case: provided a directory without flags
    } else if (argumentStats.isDirectory()) {
        console.log(`rm-safe: ${argument}: is a directory\n`)
        return process.exit(0)
      // Case: wildcards
    } else if (argument.includes('*')) {
      handleWildcards(arguments, argument)
    } else {
      safeRemove(argument)
      // Pretty-print carriage return before terminating
      if (arguments.length - 1 === i) {
        console.log()
      }
    }
  })
}

const deleteDirectory = (arguments, argument) => {
  // Case: no directory name was provided
  if (!arguments[++i]) {
    console.log(`rm-safe: no directory provided\n`)
    return process.exit(0)
  } else {
    verifyDirDelete(argument)
  }
}

const verifyDirDelete = (argument) => {
  inquirer.prompt([
          {
            type: 'confirm',
            name: 'confirm',
            message: 'Are you sure you want to remove this directory?',
            default: false
          }
        ]).then(choice => {
          if (!choice.confirm) {
            console.log(`rm-safe: directories not removed\n`)
            return process.exit(0)
          } else {
            arguments.forEach((dirName, i) => {
              if (i > 0) {
                execSync(`rm ${argument} ${dirName}`)
                console.log(`rm-safe: directories removed\n`)
              }
            })
          }
        })
}

const isWildcardMatch = (argument, pattern) => {
  let wildcardRegex = (argument) => argument.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
  return new RegExp("^" + pattern.split("*").map(wildcardRegex).join(".*") + "$").test(argument)
}

const handleWildcards = (arguments, argument) => {
  arguments.forEach(argv => {
    // Case: wildcard for directory contents
    if (argv.substring(argv.length - 2) === '/*' || argv.substring(argv.length - 2) === '\\*' ) {
       execSync(`mv ${argv} ${process.env.TMPDIR}`)
       console.log(`rm-safe: ${argv} directory was emptied, and the files are now temporarily stored in ${process.env.TMPDIR}`)
      // Case: wildcard base case
    } else if (isWildcardMatch(argv, argument)) {
      safeRemove(argv)
    }
    return process.exit(0)
  })
}

const safeRemove = (argument) => {
  execSync(`mv ${argument} ${process.env.TMPDIR}`)
  console.log(`rm-safe: ${argument} was removed, and is now temporarily stored in ${process.env.TMPDIR}`)
}

module.exports = {
  tempFolderCheck: tempFolderCheck,
  rm: rm
}
