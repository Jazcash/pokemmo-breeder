# ExampleGameTS
Example Game built from scratch utilising Webpack, Typescript and Phaser CE

## Getting started

- Install node.js LTS - https://nodejs.org/en/
- Install dependencies `npm install --only=prod`
- Run Webpack `npm run dev` - includes sourcemaps and watches the project for changes

### Other commands are:
- `npm run dev-code` - Same as dev but without watching assets
- `npm run prod` - Cleans build folder and publishes a new full-build without sourcemaps and with minified code

## TODO
- Add optional plugins (e.g. particleStorm)
- Make sure all data is parsed in gdm-server and not anywhere else (e.g. reelSets)
- ReelManager skip should work with start delay
- Chrome debugging showing strange values for args/variables
- Game specific instances of lib modules (e.g. symbol.ts)
- Game specific enums for symbol names?

## General Framework changes

### Major
- Typescript - Includes ES6, enums, interfaces, full OOP support and other lovely bits - http://www.typescriptlang.org/docs/handbook/basic-types.html
- Webpack 3.10.0
- Phaser CE ^2.10.1 - Remove ^ in package.json to lock version
- Dynamically generated spritesheets as part of Webpack process - Not fully integrated with Webpack
- Dynamically generated audiosprites as part of Webpack process - Not fully integrated with Webpack
- Automatic audio conversion from .ogg to .mp3 and .m4a
- TSLint - Warnings for code that mismatches rules specified in tslint.json

### Minor
- images folder is now where non-spritesheeted images live
- all language assets should now sit under one language code folder. e.g. bigwin_en, language_en -> en

## Project changes

### Major
- Core is now central point for the whole project. main.js is just the entry point
- game folder now represents game-specific code
- Phaser states are now used - Order is Preload -> Load -> Game
- game/gdm-adaptor merged into lib/gdm-server
- Canvas no longer fills the whole window for framerate increase

## Minor
- lib/reelmanager is now lib/reelCollection to better represent being a world object
- lib/reelStrip is new type which represents a subset of a single lib/reelSet
- lib/signal is a new type which should mimic Phaser.Signal, but also supports custom types, which Phaser.Signal does not
- Debugging is now enabled based on if the url contains shefbox.co.uk/dev

# Notes
- TSLint rules are WIP - Feel free to add or remove rules per project - Rule changes require webpack restart

# VSCode
- VSCode is recommended as it provides Typescript intellisense, including Phaser and the project itself. Also has terminal, debugging and git integrated in
- When making changes to tsconfig/tslint or other configs, VSCode will require a reload for intellisense to pickup on the changes `Ctrl + Shift + P` -> Reload Window
- You can use VSCode for debugging by installing the 'Debugger for Chrome' VSCode extension, then just run the 'Attach Chrome to Shefbox' task from the debug menu. 
    You will need to change the url in .vscode/launch.json to use the correct game
- Recommended extensions: TSLint, Debugger for chrome, EditorConfig
