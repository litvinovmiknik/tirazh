import path from 'path';
import { blocksDir, blockNames } from './config.js'
import { validateBlockName, dirNotExist, createDir, createFiles } from '../core.js';

describe('validateBlockName()', () => {

    describe('Checks block name for valid characters', () => {

        blockNames.forEach(item => {
            it(item, done => {
                const promise = validateBlockName(item);
                promise.then(() => done(), err => done(err));
            });
        });

    });

});

describe('dirNotExist()', () => {

    describe('Checks for the not existence of a block directory at the specified path', () => {

        blockNames.forEach(name => {
            const blockPath = path.join(path.resolve(blocksDir), name);
            it(name, done => {
                const promise = dirNotExist(blockPath, name);
                promise.then(() => done(), err => done(err));
            });
        });
    });
});

describe('createDir()', () => {

    describe('Creates a directory for the block', () => {

        blockNames.forEach(name => {
            const blockPath = path.join(path.resolve(blocksDir), name);
            it(name, done => {
                const promise = createDir(blockPath);
                promise.then(() => done(), err => done(err));
            });
        });
    });
});

describe('createFiles()', () => {

    describe('Creates a files for the block', () => {

        blockNames.forEach(name => {
            const blockPath = path.join(path.resolve(blocksDir), name);
            it(name, done => {
                const promise = createFiles(blockPath, name);
                promise.then(() => done(), err => done(err));
            });
        });
    });
});