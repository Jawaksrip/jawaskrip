const path = require('path')
const fs = require('fs')
const app = require('commander')
const ON_DEATH = require('death')

const program = require('./program')

const { version, description } = require('../../package.json')

if (
    process.argv[2] &&
    fs.existsSync(path.resolve(process.cwd(), process.argv[2]))
) {
    program.runFile(process.argv[2])
}

function checkOption() {
    if (app.verbose) global.verbose = true
}

app.version(version).description(description)

/* eslint-disable no-console */
app.option('--verbose', 'debug logging')

app
    .command('bantuan')
    .alias('help')
    .description('Tampilkan bantuan')
    .action(() => app.help())

app
    .command('r <file>')
    .alias('run')
    .description("Run file jawaskrip, 'r' adalah perintah default")
    .action(filepath => {
        checkOption()
        program.runFile(filepath)
    })

app
    .command('c <file>')
    .alias('compile')
    .description('Compile dan print ke konsole')
    .action(filepath => {
        checkOption()
        program.compile(program.getRealPath(filepath), result => {
            console.log(result)
        })
    })

app
    .command('o <file> <output>')
    .alias('output')
    .description('Compile dan simpan ke file javascript')
    .action((filepath, output) => {
        checkOption()
        program.compile(program.getRealPath(filepath), result => {
            fs.writeFileSync(path.join(process.cwd(), output), result)
        })
    })

app
    .command('contoh <output>')
    .description('Membuat folder contoh ke direktori output')
    .action(dirpath => {
        checkOption()
        program.copyExample(path.join(process.cwd(), dirpath), () => {
            console.log('Done!')
        })
    })

app
    .command('t <file>')
    .alias('token')
    .description('Generate token / lex (debug)')
    .action(filepath => {
        checkOption()
        program.token(program.getRealPath(filepath), token => {
            console.log(token)
        })
    })

app
    .command('clean')
    .description('clean temp file')
    .action(() => {
        checkOption()
        program.clean(message => {
            console.log(message)
        })
    })

app.parse(process.argv)

if (app.args.length < 1) {
    console.log(`versi jawaskrip: ${app.version()}, 'jw -h' untuk bantuan`)
}

ON_DEATH((signal, err) => {
    console.info('\n\nProcess terminated, recovering...')
    program.recover(
        program.getCompiledPath(),
        fs.readFileSync(global.userFilePath)
    )
})
