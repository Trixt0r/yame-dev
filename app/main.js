"use strict";
var console = require('console');
var chokidar = require('chokidar');
module.exports = function (window, Backend, Pubsub) {
    if (process.type === 'renderer')
        return;
    var need_reload = false;
    var init = false;
    var intFn = null;
    console.log(Backend.appDir);
    function scheduleReload() {
        if (intFn)
            clearInterval(intFn);
        intFn = setInterval(function () {
            if (!init) {
                clearInterval(intFn);
                window.reload();
            }
        }, 10);
    }
    window.on('pre-reload', function () { return init = true; });
    window.on('webcontents:finish-load', function () { return init = false; });
    var options = { ignored: /[\/\\]\./ };
    var watch = function (dir) { return chokidar.watch(dir, options).on('all', scheduleReload); };
    var watchers = [];
    // One-liner for current directory, ignores .dotfiles
    watchers.push(watch(Backend.appDir));
    watchers.push(watch(Backend.templateDir));
    watchers.push(watch(Backend.cssDir));
    Pubsub.on('main:quit', function () { return watchers.forEach(function (watcher) { return watcher.close(); }); });
    return {};
};
//# sourceMappingURL=main.js.map