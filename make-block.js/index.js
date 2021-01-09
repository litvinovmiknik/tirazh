import { init } from './core.js';

const blockNamesFromCli = process.argv.slice(2);

init(blockNamesFromCli);