// Node server which will handle socket.io connections

const io= require("socket.io")(8000);
// const httpServer = require("http").createServer();
// const io = require("socket.io")(httpServer, {
//     cors: {
//       origin: "http://localhost:8000",
//       methods: ["GET", "POST"]
//     }
//   });
  
//   httpServer.listen(3000);
const users = {};

io.on("connection",socket=>{
    socket.on('new-user-joined', name =>{
        console.log('in server',name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name)
    })

socket.on('send', message=>{
    socket.broadcast.emit('recieve',{message : message,name :users[socket.id]})

})
socket.on('disconnect', message=>{
    socket.broadcast.emit('left',users[socket.id])
    delete users[socket.id];
    

})
})

