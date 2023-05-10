import { Socket } from 'socket.io'
import handleOrderbookSocket from './orderbook'

export const handleSocketConnection = (socket: Socket) => {
  console.log('Client connected:', socket.id)

  // Orderbookイベントのハンドリング
  socket.on('subscribeOrderbook', payload => {
    handleOrderbookSocket(socket, payload).then(r => console.log(r))
  })

  // 他のWebSocketチャンネルについても同様にハンドリングを追加
  // ...

  // クライアントが切断した際のハンドリング
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
}
