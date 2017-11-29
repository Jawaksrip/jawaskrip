/**
 * @author indmind <mail.indmind@gmail.com>
 * @file Process user input
 * @version 0.0.2
 */

const filterParameters = require("./filterParameters");
const program = require("./program");
const path = require("path");
const fs = require('fs');
const app = require("commander");
const {version, description} = require("../../package.json");


function run(filepath, callback){
    global.userFilePath = filepath;
    program.compile(getRealPath(filepath), _compiled => {
        program.run(_compiled, callback);
    });
}

function getRealPath(_path){
    if(fs.existsSync(_path)){
        return _path;
    }else if(fs.existsSync(path.resolve(process.cwd(), _path))){
        return path.resolve(process.cwd(), _path);
    }else{
        console.log("Invalid file specified");
        process.exit();
    }
}

exports.run = _execDone => {

    // if the first argumet is file, autorun
    if(fs.existsSync(path.resolve(process.cwd(), process.argv[2]))) run(process.argv[2], _execDone);

    app.version(version).description(description);

    app
        .command("r <file>")
        .alias("run")
        .description("Run jawaskrip file, 'r' is default 'jawaskrip file.jwsl' will run the script")
        .action(filepath => run(filepath, _execDone));

    app
        .command("t <file>")
        .alias("token")
        .description("Generate token / lex")
        .action((filepath) => {
            global.userFilePath = filepath;
            program.token(getRealPath(filepath), _token => {
                console.log(_token);
                _execDone();
            });
        });

    app
        .command("clean")
        .description("clean temp file")
        .action(() => {
            program.clean((_mess) => {
                console.log(_mess);
                _execDone();
            });
        });

    app
        .command("c <file>")
        .alias("compile")
        .description(`Compile jawaskrip to javascript and print out to stdout`)
        .action((filepath) => {
            global.userFilePath = filepath;
            program.compile(getRealPath(filepath), _compiled => {
                console.log(_compiled);
                _execDone();
            });
        });

    app
        .command("o <file> <output>")
        .alias("output")
        .description("Compile and create javascript file")
        .action((filepath, _output) => {
            global.userFilePath = filepath;
            program.compile(getRealPath(filepath), _compiled => {
                fs.writeFile(path.join(process.cwd(), _output), _compiled, err => {
                    if(err) throw err;
                    _execDone();
                });
            });
        });


    app.parse(process.argv);


    // /** 
    //  * @const filepath - path file yang akan dicompile
    //  */
    // const filepath = path.resolve(process.cwd(), process.argv[2]);
    // // cek jika file ada
    // if(!fs.existsSync(filepath)){
    //     console.log("Invalid file specified");
    //     process.exit();
    // }
    // /**
    //  * @var parameters - list parameter yang diberikan user
    //  */
    // let parameters = [];
    // // mendapat parameter
    // process.argv.forEach(parameter => {
    //     if(parameter.charAt(0) == "-"){
    //         parameters.push(parameter);
    //     }
    // });

    // /**
    //  * @const action - aksi selanjutnya setelah parameters difilter
    //  */
    // const action = filterParameters(parameters);

    // // exit proses jika action['exit'] == true
    // if(action.exit) process.exit();

    // // compile file yang diberikan
    // if(action.compile){
    //     console.log(program.compile(filepath));
    // }

    // // run compiled
    // if(Object.keys(action).length <= 0 || action.run){
    //     program.run(program.compile(filepath));
    // }
};
