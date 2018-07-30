let connect: HTMLInputElement;
let send: HTMLInputElement;
let closeChannel: HTMLInputElement;

let input: HTMLTextAreaElement;
let output: HTMLTextAreaElement;

const enableConnect = () => (connect.disabled = false);
const disableConnect = () => (connect.disabled = true);
const enableSend = () => (send.disabled = false);
const disableSend = () => (send.disabled = true);
const enableClose = () => (closeChannel.disabled = false);
const disableClose = () => (closeChannel.disabled = true);

let localConnection: RTCPeerConnection;
let remoteConnection: RTCPeerConnection;

let localChannel: RTCDataChannel;

const init = () => {
    connect = document.querySelector('input#connect') as HTMLInputElement;
    send = document.querySelector('input#send') as HTMLInputElement;
    closeChannel = document.querySelector('input#close') as HTMLInputElement;

    input = document.querySelector('textarea#input') as HTMLTextAreaElement;
    output = document.querySelector('textarea#output') as HTMLTextAreaElement;

    connect.addEventListener('click', createConnection);
    send.addEventListener('click', sendData);
    closeChannel.addEventListener('click', closeConnection);
    enableConnect();
};

const sendData = () => {
    const data = input.value;
    input.value = '';
    localChannel.send(data);
};

const closeConnection = () => {
    localConnection.close();
    remoteConnection.close();
    enableConnect();
    disableClose();
    disableSend();
};

window.addEventListener('load', init);

const createConnection = () => {
    localConnection = new RTCPeerConnection({});
    console.log('Local created');
    localConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) =>
        onIceCandidate(localConnection, event);
    localChannel = localConnection.createDataChannel('chat');
    console.log('Channel created');
    localChannel.onopen = () => localChannel.send('Hello World');
    localChannel.onmessage = (event: MessageEvent) => console.log('Receive receive', event.data);

    remoteConnection = new RTCPeerConnection({});
    console.log('Remote created');
    remoteConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) =>
        onIceCandidate(remoteConnection, event);
    remoteConnection.ondatachannel = (event: RTCDataChannelEvent) => {
        console.log('Channel found');
        const remoteChannel = event.channel;
        remoteChannel.onopen = () => remoteChannel.send('Hello World Back');
        remoteChannel.onmessage = (event: MessageEvent) => {
            console.log('Send receive', event.data);
            output.value = event.data;
        };
    };

    localConnection
        .createOffer()
        .then(gotDescription1)
        .catch(() => console.log('failed to create offer'));

    disableConnect();
    enableSend();
    enableClose();
};

const getOtherConnection = (connection: RTCPeerConnection) =>
    connection === remoteConnection ? localConnection : remoteConnection;

const onIceCandidate = (connection: RTCPeerConnection, event: RTCPeerConnectionIceEvent) => {
    getOtherConnection(connection)
        .addIceCandidate(event.candidate)
        .then(() => console.log('Added ICE candidate'))
        .catch(() => console.log('Failed to add ICE candidate'));
};

const gotDescription1 = (desc: RTCSessionDescriptionInit) => {
    localConnection.setLocalDescription(desc);
    remoteConnection.setRemoteDescription(desc);
    remoteConnection
        .createAnswer()
        .then(gotDescription2, () => console.log('Failed to create session description'));
};

const gotDescription2 = (desc: RTCSessionDescriptionInit) => {
    remoteConnection.setLocalDescription(desc);
    localConnection.setRemoteDescription(desc);
};
