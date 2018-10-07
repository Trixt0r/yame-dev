# yame-dev (ng2)

Development plugin for the [yame editor](https://github.com/Trixt0r/yame/tree/ng2).

This plugin enables the possibilty to re-load automatically the app if any change happens during development.

If only changes related to the renderer process happen, the web content gets reloaded. Otherwise the whole electron process will be re-started.

This projects serves also as a small example on how to use plugins within the editor itself, for custom extensions.

It is assumed, that [nodejs and npm](https://nodejs.org) are installed on your machine. Preferably __node 10.11.0__ and __npm 6.4.1__.

## Installing

Switch to the plugins folder of your yame project and add it to your plugins folder.

See `config.json` of the yame project which folder (default is `plugins`).

So you basically do the following

```sh
cd /your/yame/git/clone/your/plugins/folder

git clone https://github.com/Trixt0r/yame-dev.git
cd yam-dev && git checkout ng2
#or directly checkout only the ng2 branch for now
git clone --single-branch -b ng2 https://github.com/Trixt0r/yame-dev.git
```

After cloning it, you run `npm install`.

## Building

It is important that the yame project is present as a __node_module__, such that building this project works without any Typescript errors.

Please do __one__ of the following first:

Either a global npm link
```sh
cd /your/yame/git/clone
npm ln
cd /your/yame-dev/git/clone
npm ln yame
```

Or
```sh
# Unix
ln -s /path/to/your/yame/clone node_modules/yame

# Windows
mklink /J node_modules\yame path\to\your\yame\clone
```

> Note, that this process is subject to change.
> This is only done, since there are no yame typings yet, for building without errors.
> As soon as the editor is published to npm, this is going to be obsolete and can be skipped.

If the yame project is present in the __node_modules__ folder, you can run

```sh
npm run build
```

If everything ran without errors, you should see a folder named `dist` with an ng and and electron part.

You can now start the yame editor and it should reload as soon as a change happens in the app code.

## Development

In order to make the development as easy as possible, you can just call

```sh
npm run watch
```

This will watch the ng and electron parts and re-build as soon as a change happens.

Changes to plugins should also reload the web contents.
Note that the browser main process will only restart as soon as a change happens
to the main electron file, due to the behaviour of `electron-reload`.
