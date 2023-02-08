// const socket = io('http://localhost:8000');
// var socket = io('https://localhost:8000', { transports :  ['websocket', 'polling', 'flashsocket'] });
const socket = io('http://localhost:8000', {
    withCredentials: true
})

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container')
var audio = new Audio('snd_fragment_retrievewav-14728.mp3')

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
    messageContainer.append(document.createElement('br'))
    if(position == 'left'){
        audio.play();
    }
}


form.addEventListener('submit',(e)=>{
e.preventDefault();
const  message = messageInput.value;
append(`you : ${message}`,'right');
socket.emit('send',message);
messageInput.value='';

})

const nav = prompt('Enter your name to join.')
console.log('nav', socket);

socket.emit('new-user-joined', nav);

socket.on('user-joined',nav=>{
    append(`${nav} joined the chat`, 'center');
})

socket.on('recieve',data=>{
    console.log('data',data);
    append(`${data.name} : ${data.message}`, 'left');
})

socket.on('left',name=>{
    console.log('data',name);
    append(`${name} left the chat`, 'center');
})