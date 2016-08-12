var fs = require('fs');
var path = require('path');
var interfaceGenerator = require('./interface-generator');
var ngConfig = require('ng-config');
var yargs = require('yargs');
var _ = require('lodash');

// cli configuration
var argv = yargs
  .usage('ngconfig [configJsonPath] [outputJsPath] [--moduleName|-m <string>] [--useExistingModule|-x <boolean>] [--interface|-t <boolean>] [--imports|-i <array>] [--exports|-e <string>]')
  .example('ngconfig src/config.dev.json src/app/config.js -m configuration')
  .example('ngconfig src/config.prod.json src/app/config.js -m configuration -x')
  .example('ngconfig src/config.prod.json src/app/config.ts -m configuration -e config')
  .example('ngconfig src/config.prod.json src/app/config.ts -m configuration -e config -i path/to/dependency another/path -o')
  .option('m', {
    alias: 'moduleName',
    type: 'string',
    describe: 'Name of angular module',
    default: 'config'
  })
  .option('x', {
    alias: 'useExistingModule',
    type: 'boolean',
    describe: 'Defines whether a new module should be created or not',
    default: false
  })
  .option('i', {
    alias: 'imports',
    type: 'array',
    describe: 'Paths for es6 modules',
    default: []
  })
  .option('e', {
    alias: 'export',
    type: 'string',
    describe: 'Export name for es6 modules',
    default: false
  })
  .option('o', {
    alias: 'exportObjects',
    type: 'boolean',
    describe: 'Export constants directly',
    default: false
  })
  .option('t', {
    alias: 'interface',
    type: 'boolean',
    describe: 'Creates typescript interfaces if true',
    default: false
  })
  .demand(2)
  .argv;

// main arguments
var ngConfigOutPath = argv._.pop();
var configPaths = [].concat(argv._);

var configs = configPaths.map(function (path) {
  return JSON.parse(fs.readFileSync(path))
});

var mergedConfig = _.defaultsDeep.apply(_, configs);

// ngConfig options
var options = {
  template: path.join(__dirname, './module.tpl'),
  module: argv.moduleName,
  useExistingModule: argv.useExistingModule,
  _export: argv.export,
  exportObjects: argv.exportObjects,
  imports: argv.imports,
  interfaces: argv.interface ? interfaceGenerator.generate(mergedConfig) : null,
  constants: mergedConfig
};

// create angular constants template string
var config = ngConfig(options);

// write constants to config javascript file
fs.writeFileSync(ngConfigOutPath, config);
