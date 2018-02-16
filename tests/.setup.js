/*
 * ES2015
 * - Transpile with Babel
 * - Add `app/` directory, just like Brunch convention
 */
const path = require('path');
const babelRegister = require('babel-register');
const babelResolver = require('babel-resolver');
const app = path.join(__dirname, '..', 'app');
const resolveModuleSource = babelResolver(app);
babelRegister({ resolveModuleSource });


/*
 * Enzyme stuff
 * http://airbnb.io/enzyme/docs/guides/jsdom.html
 */
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

// HTMLElement
global.HTMLElement = window.HTMLElement;
