# [rm-safe](https://www.npmjs.com/package/rm-safe) ✔️
## Why 'adjust' `rm`?
<img src="https://i.imgur.com/0kycDvI.png" width="325px" />

**👉 The [`rm`](https://ss64.com/bash/rm.html) command is a footgun.**

If you're like me, you've shot yourself in the foot too many times using the standard [`rm`](https://ss64.com/bash/rm.html) shell command. This CLI [module](https://www.npmjs.com/package/rm-safe) is a simple attempt at adding a layer of safety around `rm`, while still fulfilling its intended purpose.

`rm` has no built in safety. The files you target get unlinked, the metadata is removed, and it's just gone. In other words: if you delete something, its permanently deleted. If you're confident you'll use it correctly all the time, then more power to you, I only hope this module might ease your conscience more if you're not.

## What's different?
**`safe-rm` has two opinions:**
1️⃣ A backup of the files you delete should be temporarily stored in a common `/temp` directory, so that you can recover something if you did not intend to delete it.
2️⃣ A last-ditch confirmation dialogue should happen whenever you use the `-r`, `-rf`, or `-Rf` flags. This way 

## Installation
1. Run $`npm install -g rm-safe`

2. If you don't have one already, add a new local `~/temp` directory to ensure the system always knows where to eventually delete your backup files. `safe-rm` will add one for you when you first run it if it doesn't exist, but you'll still need to add this line to your local shell configuration file (eg. `~/.bash_profile`, `~/.bashrc`, etc): `export TMPDIR=~/temp`

3. Add an alias for the `rm` command in your shell configuration file: `alias rm="rm-safe"` (Note: this will only work if `rm-safe` has been installed globally).


## Use
* If you added the alias, you can now use `rm-safe` just like you're used to with `rm`.
* If you'd rather not add an alias, you can just run $`rm-safe` command from your terminal.
* `rm-safe` also supports the use of standard wildcards (eg. `rm my-directory/*`, `rm *.txt`, `*example*`, etc).

## 
##### License: [ISC](https://opensource.org/licenses/ISC)
