const { exec } = require('child_process');

const tIndex = process.argv.indexOf('-m');

let message = '';
if (tIndex !== -1 && tIndex + 1 < process.argv.length && typeof process.argv[tIndex + 1] !== 'undefined' && process.argv[tIndex + 1]) {
    message = process.argv[tIndex + 1];
}

console.log(message);

deploy();

async function deploy() {
    try {
        await command('git add .');
        await command('git status');
        await command(`git commit -m "${message}"`);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

function command(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            console.log('> ' + cmd);

            if (error) {
                console.error('error: ' + error);
                reject(error); // Reject the promise if there's an error
                return;
            }
            console.log('output: ' + stdout);
            resolve(); // Resolve the promise if the command succeeds
        });
    });
}