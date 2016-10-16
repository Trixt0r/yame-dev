import * as path from 'path';
import * as fs from 'fs';
import * as chokidar from 'chokidar';

// Module for watching file changes while developing yame editor.
// Watches js, html and css files for changes and reloads the window on change.
module.exports = function( window: Electron.BrowserWindow, Backend, Pubsub: Backbone.Events) {
    // Skip if we are in the rendering process
    if (process.type === 'renderer') return;

    var need_reload = false;
    var init = false;
    var intFn = null;

    function scheduleReload() {
        if (intFn)
            clearInterval(intFn);
        intFn = setInterval(() => {
            if (!init) {
                clearInterval(intFn);
                window.reload();
            }
        }, 10);
    }

    window.on('pre-reload', () => init = true );
    window.on('webcontents:finish-load', () => init = false);

    let options = { ignored: /[\/\\]\./ };

    let watch = dir => chokidar.watch(dir, options ).on('all', scheduleReload);

    // Keep all watchers in an array
    let watchers: fs.FSWatcher[] = [];

    // Add watchers for js, html and css files
    watchers.push(watch(Backend.appDir));
    watchers.push(watch(Backend.templateDir));
    watchers.push(watch(Backend.cssDir));

    Pubsub.on('main:quit', () => watchers.forEach(watcher => watcher.close()));

    return {};
}
