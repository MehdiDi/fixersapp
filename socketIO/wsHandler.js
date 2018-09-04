

module.exports = class wsHandler {
    
    constructor(server) {
        this.io = require('socket.io').listen(server);
        this.sockets = [];
    }

    listenEvents () {
        this.io.sockets.on('connection', socket => {
            socket.on('loggedIn', data => {

                this.sockets = this.sockets.filter(socket => socket.userId !== data.id);
                this.sockets.push({userId: data.id, socketId: socket.id});
                
                console.log(this.sockets);
            });

        });
    }
    
 
    sendNotification(userId, notification) {
        
        const socket = this.sockets.filter(s => s.userId === userId );
        if(socket.length === 0)
            return;
        
        this.io.to(`${socket[0].socketId}`).emit('notify', notification);

        
    }
   
}




