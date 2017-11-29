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

exports.run = _execDone => {

    app.version(version).description(description);

    app
        .command("r <_file>")
        .alias("run")
        .description("Run jawaskrip file")
        .action((filepath) => {
            program.compile(getRealPath(filepath), _compiled => {
                program.run(_compiled, () => _execDone());
            });
        });

    app
        .command("t <_file>")
        .alias("token")
        .description("Generate token / lex")
        .action((filepath) => {
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
        })

    app
        .command("c <_file>")
        .alias("compile")
        .description(`Compile JawaSkrip to JavaScript and print out to stdout. to create output file use "jawaskrip c <file> > output.js`)
        .action((filepath) => {
            program.compile(getRealPath(filepath), _compiled => {
                console.log(_compiled);
                _execDone();
            });
        });


    app.parse(process.argv);



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
