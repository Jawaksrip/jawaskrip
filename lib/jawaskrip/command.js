/**
 * @author indmind <mail.indmind@gmail.com>
 * @file Process user input
 * @version 0.0.1
 */

const filterParameters = require("./filterParameters");
const program = require("./program");
const path = require("path");
const fs = require('fs');

exports.run = () => {
    /**
     * @const filepath - path file yang akan dicompile
     */
    const filepath = path.resolve(process.cwd(), process.argv[2]);
    // cek jika file ada
    if(!fs.existsSync(filepath)){
        console.log("Invalid file specified");
        process.exit();
    }
    /**
     * @var parameters - list parameter yang diberikan user
     */
    let parameters = [];
    // mendapat parameter
    process.argv.forEach(parameter => {
        if(parameter.charAt(0) == "-"){
            parameters.push(parameter);
        }
    });

    /**
     * @const action - aksi selanjutnya setelah parameters difilter
     */
    const action = filterParameters(parameters);

    // exit proses jika action['exit'] == true
    if(action.exit) process.exit();

    // compile file yang diberikan
    if(action.compile){
        console.log(program.compile(filepath));
    }

    // run compiled
    if(action.length <= 0 || action.run){
        program.run(program.compile(filepath));
    }
};
