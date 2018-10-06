import * as path from 'path';
import * as yame from 'yame';

class Plugin {
  constructor() { }
  initialize() {
    const env = yame.Environment;
    const ending = process.platform === 'win32' ? '.cmd' : '';
    require('electron-reload')(env.appDir, {
      electron: path.join(env.appDir, 'node_modules', '.bin', `electron${ending}`)
    });
    return Promise.resolve();
  }
}
export = new Plugin();
