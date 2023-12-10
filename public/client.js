const isSecure = location.protocol === 'https:';
const protocol = isSecure ? 'wss://' : 'ws://';
const port = location.port ? `:${location.port}` : '';
const wss = new WebSocket(`${protocol}${location.hostname}${port}`);

const nameInput = document.getElementById('name-input')
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        const data = {
            name: nameInput.value,
            message: input.value,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        }
        const jsonString = JSON.stringify(data);
        wss.send(jsonString);
        displayMessage(true, data)
        input.value = '';
    }
});

wss.addEventListener('message', (e) => {
    console.log(e.data);
    displayMessage(false, JSON.parse(e.data))
});

function displayMessage(isOwner, data) {
    const item = `
        <li class="${isOwner ? 'message-sent' : 'message-received'}">
            <div class="meta">${data.name} ${data.date} ${data.time}</div>
            <div class="message">${data.message}</div>
        </li>`
    messages.innerHTML += item;
    window.scrollTo(0, document.body.scrollHeight);
}