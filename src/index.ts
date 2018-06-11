namespace webrtc {
    let connect: HTMLInputElement;
    let send: HTMLInputElement;
    let close: HTMLInputElement;

    const enableConnect = () => (connect.disabled = false);
    const disableConnect = () => (connect.disabled = true);
    const enableSend = () => (send.disabled = false);
    const disableSend = () => (send.disabled = true);
    const enableClose = () => (close.disabled = false);
    const disableClose = () => (close.disabled = true);

    const createConnection = () => {};

    const init = () => {
        connect = document.querySelector('input#connect') as HTMLInputElement;
        send = document.querySelector('input#send') as HTMLInputElement;
        close = document.querySelector('input#close') as HTMLInputElement;

        connect.addEventListener('click', createConnection);

        enableConnect();
    };

    window.addEventListener('load', init);
}
