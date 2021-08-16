const button_resize = document.getElementById("button_resize");

function quit() {
    window.api.send_quit();
}

function mini() {
    window.api.send_mini();
}

function resize() {
    window.api.send_resize();
}

window.onresize = () => {
    window.api.getWindowSize();
}

window.api.on('getWindowSize-reply', (e, isMax) => {
    if (isMax) {
        button_resize.classList.add('unMax');
        button_resize.classList.remove('max');
    } else {
        button_resize.classList.add('max');
        button_resize.classList.remove('unMax');
    }
});

window.api.getWindowSize();