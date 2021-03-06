"use strict";

const program = require("commander");
const project = require("../Project").newInstance();
const __path = require("path");

const defaultWebpackConfig = require.resolve('../webpack/webpack.config-development');
const webpackResolvers = require('../webpack/resolvers');

const webpackDevServerPath = webpackResolvers.resolveBinWebpackDevServer('webpack-dev-server');
if (! webpackDevServerPath) {
  console.error('could not determine the path the webpack-dev-server executable');
  process.exit(1);
}

const dpatModules = __path.resolve(__dirname, '../../../../node_modules');
/**
 * @param {String} path
 * @param {Command} cmd
 */
function action(path, port, cmd)
{
    const projectDir = __path.resolve(path);

    const runConfig = {
        webpackDev: webpackDevServerPath,
        webpackConfig: defaultWebpackConfig,
        modulePaths: [ dpatModules ]
    };
    if (! project.startDevServer(projectDir, runConfig)) {
        console.error(`ERROR: could not start dev server at ${path}`);
        process.exit(1);
    }
}

program
    .version("0.1.0", "-V, --version")
    .arguments("<path>")
    .option("-p, --port <port>", "specify which port the server will listen on for requests")
    .action(action)
    .parse(process.argv);


