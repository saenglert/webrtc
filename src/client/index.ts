import * as sockjs from 'sockjs-client';
import trace from '../common/trace';
import './index.css';


const server = new sockjs('http://localhost');

server.onopen = () => {
  trace('Connection open');
  server.send('Test');
};

server.onmessage = (message) => {
  trace('Message', message.data)
  server.close();
};

server.onclose = () => {
  trace('Closing');
};