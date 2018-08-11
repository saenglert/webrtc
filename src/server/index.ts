import * as http from 'http';
import * as fs from 'fs';
import * as io from 'socket.io';
import { Config } from './constants';
import trace from '../common/trace';
import * as net from "net";

const file: string = fs.readFileSync('config.json', 'utf8');
const config: Config = JSON.parse(file);

const onCon = (req: http.IncomingMessage, res: http.ServerResponse) => {
  trace(req);
  trace(res);
};

const app: http.Server = http.createServer(onCon).listen(config.port);
const server: io.Server = io.listen(app, {origins: ['*:*']});
trace('Server listening');
trace('Origins', server.origins());

const onCreateOrJoin = (channel: string, socket: io.Socket) => {
  trace(channel, socket.rooms);
};

const onResponse = () => {};

const onConnection = (socket: io.Socket) => {
  trace('New Connection');
  socket.on('create or join', channel => onCreateOrJoin(channel, socket));
  socket.on('response', onResponse);
};

server.sockets.on('connection', onConnection);

