let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let cors = require('cors');

let fs = require('fs');
let util = require('util');

let consoleLogStream = fs.createWriteStream(__dirname + '/server_console.log', {flags: 'a'});
let requestsLogStream = fs.createWriteStream(__dirname + '/requests.log', {flags: 'a'});
let logStdOut = process.stdout;

// store stdout in /server_console.log file
console.log = function (anything) { //
    consoleLogStream.write(util.format(anything) + '\n');
    logStdOut.write(util.format(anything) + '\n');
};

// routes
let indexRouter = require('./routes/apis/index');
let authRouter = require('./routes/apis/auth');

let app = express();

// store POST, PUT, GET request logs in /requests.log file
app.use(logger('combined', {stream: requestsLogStream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', cors(), authRouter);
app.use('/', indexRouter);

app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

module.exports = app;