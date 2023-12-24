const fs = require('fs');
const logPath = './log/system_log';

startFn();

function checkLogFileExists() {
    try {
        return fs.existsSync(logPath);
    } catch(err) {
        return false;
    }
}

function startFn() {
    try {
        if (!checkLogFileExists()) {
            fs.appendFile(logPath, '[*] LOG FILE CREATED, timestamp : ' + Date.now() + ' [*]\n', function (err) {
                if (err) throw err;
                console.log('LOG FILE CREATED');
            });
        }
    } catch(err) {
        console.error(err);
    }
}

const log = function (log) {
    if (checkLogFileExists()) {
        fs.appendFile(logPath, '-> LOG : ' + log + ' | timestamp : ' + Date.now() +  '\n', function (err) {});
    } else {
        console.log('LOG FILE NOT FOUND');
    }
}

log.error = function(log) {
    if (checkLogFileExists()) {
        fs.appendFile(logPath, '-> [!] ERROR [!] : ' + log + ' | timestamp : ' + Date.now() +  '\n', function (err) {});
    } else {
        console.log('LOG FILE NOT FOUND');
    }
};

log.info = function(log) {
    if (checkLogFileExists()) {
        fs.appendFile(logPath, '-> INFO : ' + log + ' | timestamp : ' + Date.now() +  '\n', function (err) {});
    } else {
        console.log('LOG FILE NOT FOUND');
    }
};

log.warning = function(log) {
    if (checkLogFileExists()) {
        fs.appendFile(logPath, '-> [*] WARNING [*] : ' + log + ' | timestamp : ' + Date.now() +  '\n', function (err) {});
    } else {
        console.log('LOG FILE NOT FOUND');
    }
};

module.exports = { log };
