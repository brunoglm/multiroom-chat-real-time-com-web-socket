/* importar as configurações do servidor*/
var app = require('./config/server')

/* parametrizar a porta de escuta*/
var server = app.listen(80, () => {
  console.log('Servidor online')
})

var io = require('socket.io').listen(server)

app.set('io', io)

/* criar a conexão por websocket */
io.on('connection', (socket) => {
  console.log('usuário conectou')

  socket.on('disconnect', () => {
    console.log('Usuário desconectou')
  })

  socket.on('msgParaServidor', (data) => {
    socket.emit('msgParaCliente', data)
    socket.broadcast.emit('msgParaCliente', data)

    if (parseInt(data.apelidoAtualizadoNosClientes) == 0) {
      socket.emit('participantesParaCliente', { apelido: data.apelido })
      socket.broadcast.emit('participantesParaCliente', { apelido: data.apelido })
    }
  })
})