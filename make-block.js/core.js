import fs from 'fs';
import path from 'path';
import { createInterface } from 'readline';
import config from './config.js';

const rl = createInterface(process.stdin, process.stdout);

const init = blockNames => {

    if (blockNames.length === 0) {
        rl.setPrompt('Block(s) name: ');
        rl.prompt();
        rl.on('line', line => init(line.trim().split(/\s+/)));
        return;
    }

    const makeBlock = blockName => {
        const blockPath = path.join(config.srcDir, config.blocksDir, blockName);

        return validateBlockName(blockName)
            .then(() => dirNotExist(blockPath, blockName))
            .then(() => createDir(blockPath))
            .then(() => createFiles(blockPath, blockName))
            .then(() => log(blockName))
            .catch(printErrMsg);
    }
    const promises = blockNames.map(name => makeBlock(name));
    rl.close();

    return Promise.all(promises);
};

const validateBlockName = blockName => {
    return new Promise((resolve, reject) => {
        const isValid = /^(\d|\w|-|_)+$/.test(blockName);

        if (isValid) {
            resolve();
        } else {
            const errMsg = (
                `ERR>>> An invalid block name '${blockName}'\n` +
                `ERR>>> A block name must include just letters (a-z, A-Z), numbers (0-9), hyphen (-), underscore (_).`
            );
            reject(errMsg);
        }
    });
};

const dirNotExist = (blockPath, blockName) => {
    return new Promise((resolve, reject) => {
        fs.stat(blockPath, notExist => {
            if (notExist) {
                resolve();
            } else {
                reject(`ERR>>> The block '${blockName}' already exists.`);
            }
        });
    });
};

const createDir = blockPath => {
    return new Promise((resolve, reject) => {
        fs.mkdir(blockPath, err => {
            if (err) {
                reject(`ERR>>> Failed to create a folder '${blockPath}'`);
            } else {
                resolve();
            }
        });
    });
};

const createFiles = (blockPath, blockName) => {
    const promises = [];
    Object.keys(config.fileSources).forEach(ext => {
        const fileSource = config.fileSources[ext].replace(/{blockName}/g, blockName);
        const filename = `${blockName}.${ext}`;
        const filePath = path.join(blockPath, filename);

        promises.push(
            new Promise((resolve, reject) => {
                fs.writeFile(filePath, fileSource, 'utf8', err => {
                    if (err) {
                        reject(`ERR>>> Failed to create a file '${filePath}'`);
                    } else {
                        appendToFile(blockName, ext);
                        resolve();
                    }
                });
            })
        );
    });
    return Promise.all(promises);
};

const appendToFile = (blockName, ext) => {
    return new Promise((resolve, reject) => {
        const appendToFileSource = config.appendToFileSources[ext].replace(/{blockName}/g, blockName);

        if (ext === 'pug') {
            fs.appendFileSync(`${config.srcDir}/templates/utils/blocks.pug`, appendToFileSource, err => {
                if (err) {
                    reject(`ERR>>> Failed to append to file '${blockName}.${ext}'`);
                } else {
                    resolve();
                }
            });
        }
        else if (ext === 'sass') {
            fs.appendFileSync(`${config.srcDir}/styles/index.sass`, appendToFileSource, err => {
                if (err) {
                    reject(`ERR>>> Failed to append to file '${blockName}.${ext}'`);
                } else {
                    resolve();
                }
            });
        }
    });
}

const log = file => {
    const line = '-'.repeat(48 + file.length);

    console.log(line);
    console.log(`The block has just been created in '${config.srcDir}/${config.blocksDir}/${file}'`);
    console.log('A list of files created:');
    Object.keys(config.fileSources).forEach(ext => console.log(`${file}.${ext}`));
    console.log(line);
};

const printErrMsg = errText => {
    console.log(errText);
};

export {
    init,
    validateBlockName,
    dirNotExist,
    createDir,
    createFiles
}