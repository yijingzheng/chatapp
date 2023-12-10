const isSecure = location.protocol === 'https:';
const protocol = isSecure ? 'wss://' : 'ws://';
const port = location.port ? `:${location.port}` : '';
const wss = new WebSocket(`${protocol}${location.hostname}${port}`);

// const wss = new WebSocket('ws://localhost:5700');

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        wss.send(input.value);
        input.value = '';
    }
});

wss.addEventListener('message', (e) => {
    const item = document.createElement('li');
    item.textContent = e.data;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});