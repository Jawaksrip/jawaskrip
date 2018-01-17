const path = require("path");
const fs = require("fs");
const app = require("commander");

const program = require("./program");

const { version, description } = require("../../package.json");

function run(filepath, callback) {
    program.compile(getRealPath(filepath), _compiled => {
        program.runLocal(_compiled, callback);
    });
}

function getRealPath(_path) {
    if (fs.existsSync(_path)) {
        global.userFilePath = _path;
    } else if (fs.existsSync(path.resolve(process.cwd(), _path))) {
        global.userFilePath = path.resolve(process.cwd(), _path);
    } else {
        console.log("Invalid file specified");
        process.exit();
    }

    return global.userFilePath;
}

exports.run = _execDone => {
    if (
        process.argv[2] &&
        fs.existsSync(path.resolve(process.cwd(), process.argv[2]))
    )
        run(process.argv[2], _execDone);

    app.version(version).description(description);

    app
        .command("bantuan")
        .alias("help")
        .description("Tampilkan bantuan")
        .action(() => app.help());

    app
        .command("r <file>")
        .alias("run")
        .description("Run file jawaskrip, 'r' adalah perintah default")
        .action(filepath => run(filepath, _execDone));

    app
        .command("c <file>")
        .alias("compile")
        .description("Compile dan print ke konsole")
        .action(filepath => {
            program.compile(getRealPath(filepath), _compiled => {
                console.log(_compiled);
                _execDone();
            });
        });

    app
        .command("o <file> <output>")
        .alias("output")
        .description("Compile dan simpan ke file javascript")
        .action((filepath, _output) => {
            program.compile(getRealPath(filepath), _compiled => {
                fs.writeFile(
                    path.join(process.cwd(), _output),
                    _compiled,
                    err => {
                        if (err) throw err;

                        _execDone();
                    }
                );
            });
        });

    app
        .command("contoh <output>")
        .description("Membuat folder contoh ke direktori output")
        .action(dirpath => {
            program.copyExample(path.join(process.cwd(), dirpath), () => {
                console.log("Done!");
                _execDone();
            });
        });

    app
        .command("t <file>")
        .alias("token")
        .description("Generate token / lex (debug)")
        .action(filepath => {
            program.token(getRealPath(filepath), _token => {
                console.log(_token);
                _execDone();
            });
        });

    app
        .command("clean")
        .description("clean temp file")
        .action(() => {
            program.clean(_mess => {
                console.log(_mess);
                _execDone();
            });
        });

    app.parse(process.argv);

    if (app.args.length < 1) {
        console.log(
            `versi jawaskrip: ${app.version()}, 'jw -h' untuk bantuan\n`
        );
    }
};
