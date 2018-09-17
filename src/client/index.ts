import * as io from 'socket.io-client';
import trace from '../common/trace';
import './index.css';

const socket = io('http://localhost:8181/');

let channel: string = '';
while (channel === '') {
  channel = prompt("Enter Channel Name");
}

socket.on('connect', () => {
  trace('Connected');
});
