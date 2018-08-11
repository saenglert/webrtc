import * as io from 'socket.io-client';
import trace from '../common/trace';
import './index.css';


const socket = io('http://localhost/');
socket.on('connect', () => {trace('Connected')});