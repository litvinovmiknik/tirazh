import through2 from 'through2';

const emitty = require('@emitty/core').configure();

const state = {
    isWatchMode: false,
    watch: {
        templates: undefined,
        styles: undefined,
        stylesLibs: undefined,
        scripts: undefined,
        scriptsLibs: undefined,
        images: undefined,
        spritesPng: undefined,
        fonts: undefined
    }
};

const getFilter = (taskName) => {
    return through2.obj(function(file, _encoding, callback) {
        emitty.filter(file.path, state.watch[taskName])
            .then((result) => {
                if (result) this.push(file);
                callback();
            });
    });
};

export {
    emitty,
    state,
    getFilter
};