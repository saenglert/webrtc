import * as http from 'http';
import * as fs from 'fs';
import * as sockjs from 'sockjs'
import { Config } from './constants';
import trace from '../common/trace';


const file: string = fs.readFileSync('config.json', 'utf8');
const config: Config = JSON.parse(file);

const echo = sockjs.createServer({sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'});
echo.on('connection', function(conn) {
  trace('Connection established');
  conn.on('data', function(message) {
    trace('Data received, writing message');
    conn.write(message);
  });
  conn.on('close', function() {trace('Closing')});
});

const server = http.createServer();
echo.installHandlers(server);
server.listen(9999, '0.0.0.0');