import http from 'http'
import app from './app'
import { Server } from 'socket.io'
import { handleSocketConnection } from './sockets'

require('dotenv').config({ path: './.env' })

const PORT = parseInt(process.env.PORT || '3001')
const HOST = process.env.HOST || 'localhost'

const server = http.createServer(app)

// Socket.IOサーバーの設定
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

// Socket.IO接続時のハンドリング
io.on('connection', handleSocketConnection)

// サーバーの起動
server.listen(PORT, HOST, 1, () => console.log(`Server running at http://${HOST}:${PORT}`))
