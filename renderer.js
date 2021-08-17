const button_resize = document.getElementById('resize');

function quit() {
    window.api.send('quit', true);
}

function resize() {
    window.api.send('resize', true);
}

function mini() {
    window.api.send('mini', true);
}

window.onresize = () => {
    window.api.send('get_window_size', true);
}

window.api.on('get_window_size_reply', (e, isMax) => {
    if (isMax) {
        button_resize.src = "button_img/unmax.png";
    } else {
        button_resize.src = "button_img/max.png";
    }
});

window.api.send('get_window_size', true);
