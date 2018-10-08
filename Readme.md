# yame-dev (npm)

Branch for npm, so when installing the plugin via npm, only relevant files will be installed.


## Building
Run the following commands for building:

```sh
git merge ng2
npm install

# On Unix
ln -s path/to/yame/checkout node_modules/yame
# On Windows

mklink /J node_modules\yame path\to\yame\checkout
npm run build
```
