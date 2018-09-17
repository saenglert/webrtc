import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as io from 'socket.io';
import * as express from 'express';
import * as cors from 'cors';
import { Config } from './constants';
import trace from '../common/trace';

const file: string = fs.readFileSync('config.json', 'utf8');
const config: Config = JSON.parse(file);

const exp: express.Express = express();
const server: http.Server = new http.Server(exp);
const sio: io.Server = io(server);

exp.use(cors({ origin: true }));
exp.use(express.static('dist'));
exp.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

const onCreateOrJoin = (socket: io.Socket, channel: string) => {
  const existingChannles = sio.sockets.adapter.rooms;

  if (!existingChannles.hasOwnProperty(channel)) {
    socket.join(channel);
    socket.emit('created', channel);
  } else {

  }
};

const onMessage = () => {};

const onResponse = () => {};

sio.on('connection', (socket: io.Socket) => {
  trace('New Connection');
  socket.on('create or join', (channel: string) => onCreateOrJoin(socket, channel));
  socket.on('message', onMessage);
  socket.on('response', onResponse);
});

server.listen(config.port, () => {
  trace('Server listening on ', config.port);
});
