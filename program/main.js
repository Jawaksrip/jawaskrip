const beautify = require("js-beautify").js_beautify;

const compiler = require("../src/jawaskrip/compiler");
const parser = require("../src/jawaskrip/parser");
const program = require("../src/jawaskrip/program");

async function compile(_code) {
    return new Promise(resolve => {
        compiler.lexString(_code, token => {
            parser.parse(token, compiled => {
                resolve(beautify(compiled));
            });
        });
    });
}

async function run(_code) {
    return new Promise(resolve => {
        compiler.lexString(_code, token => {
            parser.parse(token, compiled => {
                program.run(compiled, resolve);
            });
        });
    });
}

async function runJS(_code) {
    return new Promise(resolve => {
        program.run(_code, () => resolve());
    });
}

module.exports = {
    compile,
    run,
    runJS
};
