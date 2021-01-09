const srcDir = 'app'; // Directory for all sources
const blocksDir = 'blocks'; // Directory for all blocks/components
const newLineChar = require('os').EOL; // Create new line char for windows \r\n or Linux \n
const fileSources = {
    pug: `mixin {blockName}()${newLineChar}\t.{blockName}&attributes(attributes)${newLineChar}\t\t`, // Add source in pug block file when creating this file
    sass: `.{blockName}${newLineChar}\tdisplay: block${newLineChar}\t` // Add source in sass block file when creating this file
};
const appendToFileSources = {
    pug: `${newLineChar}include ../../${blocksDir}/{blockName}/{blockName}`, // Include pug block file in blocks.pug when creating pug block file
    sass: `${newLineChar}@import '../${blocksDir}/{blockName}/{blockName}'` // Import sass block file in index.sass when creating sass block file
};

export default {
    srcDir,
    blocksDir,
    fileSources,
    appendToFileSources
};